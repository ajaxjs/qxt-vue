import mitt, { type Emitter } from 'mitt'

/**
 * 录音事件定义
 */
type RecorderEvents = {
    ready: void
    start: void
    update: number            // 当前录音时长（秒）
    end: RecorderResult
}

/**
 * 停止录音后返回的数据结构
 */
export interface RecorderResult {
    blob: Blob
    url: string
    duration: number
}

export class Recorder {
    /** 音频数据片段 */
    private audioChunks: BlobPart[] = []

    /** MediaRecorder 实例 */
    private mediaRecorder: MediaRecorder | null = null

    /** 音频流 */
    private stream: MediaStream | null = null

    /** 是否正在录音 */
    private isRecording = false

    /** 是否已获取权限 */
    private isPermissionGranted: boolean | null = null

    /** 实际使用的 mimeType */
    private readonly mimeType: string

    /** 录音开始时间 */
    private startTime: number | null = null

    /** 时长更新定时器 */
    private durationInterval: number | null = null

    /** 事件发射器 */
    private emitter: Emitter<RecorderEvents>

    constructor() {
        this.mimeType = this.getSupportedMimeType()
        this.emitter = mitt<RecorderEvents>()
    }

    /**
     * 获取浏览器支持的音频 mimeType
     */
    private getSupportedMimeType(): string {
        if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
            return 'audio/webm;codecs=opus'
        }
        if (MediaRecorder.isTypeSupported('audio/webm')) {
            return 'audio/webm'
        }
        if (MediaRecorder.isTypeSupported('audio/mp4')) {
            return 'audio/mp4'
        }
        if (MediaRecorder.isTypeSupported('audio/mp4;codecs=mp4a')) {
            return 'audio/mp4;codecs=mp4a'
        }

        throw new Error('当前浏览器不支持任何可用的音频录制格式')
    }
    get isPermission() {
        return this.isPermissionGranted
    }
    /**
     * 请求麦克风权限
     */
    async getPermission(): Promise<boolean> {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            this.isPermissionGranted = true
        } catch (err) {
            this.isPermissionGranted = false
            throw err
        }
        this.emitter.emit('ready')
        return this.isPermissionGranted
    }

    /**
     * 开始录音
     */
    async start(): Promise<void> {
        if (!this.isPermissionGranted) {
            await this.getPermission()
        }

        if (this.isRecording) {
            console.warn('录音已经在进行中')
            return
        }

        if (!this.stream) {
            throw new Error('音频流不可用')
        }

        this.audioChunks = []
        this.mediaRecorder = new MediaRecorder(this.stream, {
            mimeType: this.mimeType
        })

        this.mediaRecorder.ondataavailable = (e: BlobEvent) => {
            this.audioChunks.push(e.data)
        }

        this.mediaRecorder.start()
        this.isRecording = true
        this.startTime = performance.now()

        // 触发开始事件
        this.emitter.emit('start')

        // 每 100ms 推送一次时长更新
        this.durationInterval = window.setInterval(() => {
            if (!this.isRecording || this.startTime === null) return
            const duration = (performance.now() - this.startTime) / 1000
            this.emitter.emit('update', duration)
        }, 100)
    }

    /**
     * 停止录音
     */
    end(): Promise<RecorderResult> {
        return new Promise((resolve, reject) => {
            if (!this.isRecording || !this.mediaRecorder || !this.startTime) {
                reject(new Error('当前没有正在进行的录音'))
                return
            }

            this.mediaRecorder.onstop = () => {
                const blob = new Blob(this.audioChunks, { type: this.mimeType })
                const url = URL.createObjectURL(blob)
                const duration = (performance.now() - this.startTime!) / 1000

                // 触发停止事件
                this.emitter.emit('end', { blob, url, duration })
                resolve({ blob, url, duration })
                // 清理资源
                this.cleanup();
            }

            this.mediaRecorder.stop()
        })
    }

    /**
     * 释放所有资源（页面卸载 / 组件销毁时调用）
     */
    destroy(): void {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop())
            this.stream = null
        }
        this.isPermissionGranted = false
        this.mediaRecorder = null

        this.cleanup()

        // 清空所有事件监听
        this.emitter.all.clear()
    }
    cleanup(): void {
        if (this.durationInterval) {
            clearInterval(this.durationInterval)
            this.durationInterval = null
        }
        this.audioChunks = []
        this.isRecording = false
        this.startTime = null
    }

    /**
     * 监听事件
     */
    on<K extends keyof RecorderEvents>(
        type: K,
        handler: (event: RecorderEvents[K]) => void
    ): void {
        this.emitter.on(type, handler)
    }

    /**
     * 取消事件监听
     */
    off<K extends keyof RecorderEvents>(
        type: K,
        handler: (event: RecorderEvents[K]) => void
    ): void {
        this.emitter.off(type, handler)
    }
}
