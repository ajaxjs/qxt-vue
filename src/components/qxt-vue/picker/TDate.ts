/**
 * @1900-2100区间内的公历、农历互转
 * @charset UTF-8
 * @公历转农历：Nongli.solar2lunar(1987,11,01); [you can ignore params of prefix 0]
 */
export const Nongli = {

	/**
	 * 农历1900-2100的润大小信息表
	 * @Array Of Property
	 * @return Hex
	 */
	lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,//1900-1909
		0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,//1910-1919
		0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,//1920-1929
		0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,//1930-1939
		0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,//1940-1949
		0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,//1950-1959
		0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,//1960-1969
		0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,//1970-1979
		0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,//1980-1989
		0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,//1990-1999
		0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,//2000-2009
		0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,//2010-2019
		0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,//2020-2029
		0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,//2030-2039
		0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,//2040-2049
		/**Add By JJonline@JJonline.Cn**/
		0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,//2050-2059
		0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,//2060-2069
		0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,//2070-2079
		0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,//2080-2089
		0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,//2090-2099
		0x0d520],//2100

	/**
	 * 公历每个月份的天数普通表
	 * @Array Of Property
	 * @return Number
	 */
	solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

	/**
	 * 数字转中文速查表
	 * @Array Of Property
	 * @trans ['日','一','二','三','四','五','六','七','八','九','十']
	 * @return Cn string
	 */
	nStr1: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341"],

	/**
	 * 日期转农历称呼速查表
	 * @Array Of Property
	 * @trans ['初','十','廿','卅']
	 * @return Cn string
	 */
	nStr2: ["\u521d", "\u5341", "\u5eff", "\u5345"],

	/**
	 * 月份转农历称呼速查表
	 * @Array Of Property
	 * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
	 * @return Cn string
	 */
	nStr3: ["\u6b63", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341", "\u51ac", "\u814a"],

	/**
	 * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
	 * @param lunar Year
	 * @return Number (0-12)
	 * @eg:var leapMonth = Nongli.leapMonth(1987) ;//leapMonth=6
	 */
	leapMonth: function (y: number) { //闰字编码 \u95f0
		return (this.lunarInfo[y - 1900]! & 0xf);
	},

	/**
	 * 返回农历y年闰月的天数 若该年没有闰月则返回0
	 * @param lunar Year
	 * @return Number (0、29、30)
	 * @eg:var leapMonthDay = Nongli.leapDays(1987) ;//leapMonthDay=29
	 */
	leapDays: function (y: number) {
		if (this.leapMonth(y)) {
			return ((this.lunarInfo[y - 1900]! & 0x10000) ? 30 : 29);
		}
		return (0);
	},

	/**
	 * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
	 * @param lunar Year
	 * @return Number (-1、29、30)
	 * @eg:var MonthDay = Nongli.monthDays(1987,9) ;//MonthDay=29
	 */
	monthDays: function (y: number, m: number) {
		if (m > 12 || m < 1) { return -1 }//月份参数从1至12，参数错误返回-1
		return ((this.lunarInfo[y - 1900]! & (0x10000 >> m)) ? 30 : 29);
	},

	/**
	 * 返回公历(!)y年m月的天数
	 * @param solar Year
	 * @return Number (-1、28、29、30、31)
	 * @eg:var solarMonthDay = Nongli.leapDays(1987) ;//solarMonthDay=30
	 */
	solarDays: function (y: number, m: number) {
		if (m > 12 || m < 1) { return -1 } //若参数错误 返回-1
		var ms = m - 1;
		if (ms == 1) { //2月份的闰平规律测算后确认返回28或29
			return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
		} else {
			return (this.solarMonth[ms]);
		}
	},

	/**
	 * 传入农历数字月份返回汉语通俗表示法
	 * @param lunar month
	 * @return Cn string
	 * @eg:var cnMonth = Nongli.toChinaMonth(12) ;//cnMonth='腊月'
	 */
	toChinaMonth: function (m: number) { // 月 => \u6708
		if (m > 12 || m < 1) { return null } //若参数错误 返回null
		var s = this.nStr3[m - 1];
		s += "\u6708";//加上月字
		return s;
	},

	/**
	 * 传入农历日期数字返回汉字表示法
	 * @param lunar day
	 * @return Cn string
	 * @eg:var cnDay = Nongli.toChinaDay(21) ;//cnMonth='廿一'
	 */
	toChinaDay: function (d: number) { //日 => \u65e5
		var s;
		switch (d) {
			case 10:
				s = '\u521d\u5341';
				break;
			case 20:
				s = '\u4e8c\u5341';
				break;
			case 30:
				s = '\u4e09\u5341';
				break;
			default:
				s = this.nStr2[Math.floor(d / 10)];
				s += this.nStr1[d % 10]!;
		}
		return (s);
	},
}

export type ILifa = '公历' | '农历';

export class TDate {
	private _lifa: ILifa = '公历';//历法
	private _year: number = 0;//年
	private _month: number = 0;//月
	private _day: number = 0;//日
	private _hour: number = 0;//时
	private _miunte: number = 0;//分
	private _second: number = 0;//秒
	private _millisecond: number = 0;//毫秒
	private _week: number = 0;//星期
	private _leap: boolean = false;//是否闰月
	// 格式化字符串
	formatStr: string = 'lifa YYYY-MM-DD HH:mm leap';
	constructor(date?: any, format?: string) {
		format = format || this.formatStr;
		date = date || new Date();
		this.setDate(date);
	}
	get lifa(): ILifa {
		return this._lifa;
	}
	get year(): number {
		return this._year;
	}
	get month(): number {
		return this._month;
	}
	get day(): number {
		return this._day;
	}
	get hour(): number {
		return this._hour;
	}
	get minute(): number {
		return this._miunte;
	}
	get second(): number {
		return this._second;
	}
	get millisecond(): number {
		return this._millisecond;
	}
	get leap(): boolean {
		return this._leap;
	}
	setLifa(value: ILifa) {
		this._lifa = value;
	}
	setYear(value: number) {
		this._year = value;
	}
	setMonth(value: number) {
		this._month = Math.abs(value);
		this._leap = value < 0;
	}
	setDay(value: number) {
		this._day = value;
	}
	setHour(value: number) {
		this._hour = value;
	}
	setMinute(value: number) {
		this._miunte = value;
	}
	setSecond(value: number) {
		this._second = value;
	}
	setMillisecond(value: number) {
		this._millisecond = value;
	}
	// 设置日期
	setDate(date: Date | TDate | string) {
		if (date instanceof Date) {
			this._parseObjDate(date);
		} else if (typeof date === 'string') {
			this._parseStrDate(date);
		} else if (date instanceof TDate) {
			// 从另一个日期对象复制属性
			this._lifa = date._lifa;
			this._year = date._year;
			this._month = date._month;
			this._day = date._day;
			this._hour = date._hour;
			this._miunte = date._miunte;
			this._second = date._second;
			this._millisecond = date._millisecond;
			this._week = date._week;
			this._leap = date._leap;
		} else {
			throw new Error('日期格式错误');
		}
	}
	// 解析完整日期字符串
	_parseStrDate(dateStr: string) {
		// 分割历法、日期、闫月
		const FULL_REGX = /^([公农]历?\s+?)?(.+?)(\(.+\))?$/
		const reg = dateStr.trim().match(FULL_REGX) || new Array();
		this._lifa = reg[1]?.trim() || '公历';
		this._leap = reg[3]?.includes('闰') || false;

		// 解析日期
		const DATE_REGX = /^(\d+).(\d+).(\d+).?(\d+)?:?(\d+)?:?(\d+)?:?(\d+)?$/
		const dateRex = reg[2].trim().match(DATE_REGX) || new Array()
		this._year = +dateRex[1];
		this._month = +dateRex[2];
		this._day = +dateRex[3];
		this._hour = +dateRex[4];
		this._miunte = +dateRex[5];
		this._second = +dateRex[6];
		this._millisecond = +dateRex[7];
	}
	// 解析日期对象
	_parseObjDate(date: Date) {
		this._lifa = '公历';
		this._year = +date.getFullYear();
		this._month = +date.getMonth();
		this._day = +date.getDate();
		this._hour = +date.getHours();
		this._miunte = +date.getMinutes();
		this._second = +date.getSeconds();
		this._millisecond = +date.getMilliseconds();
		this._week = +date.getDay().toString();
		this._leap = false;
	}
	getFullYear(): number {
		return this._year
	}
	getMonth(): number {
		return this._month
	}
	getDate(): number {
		return this._day
	}
	getDay(): number {
		return this._week
	}
	getHours(): number {
		return this._hour
	}
	getMinutes(): number {
		return this._miunte
	}
	getSeconds(): number {
		return this._second
	}
	getMilliseconds(): number {
		return this._millisecond
	}

	// 农历y年闰月是哪个月
	leapMonth(year?: number): number {
		if (this._lifa !== '农历') {
			return 0;
		}
		return Nongli.leapMonth(year || this._year);
	}
	// 农历y年闰月有多少天
	leapDays(): number {
		if (this._lifa !== '农历') {
			return 0;
		}
		return Nongli.monthDays(this._year, this.leapMonth());
	}
	// 转换为农历月
	toChinaMonth(month?: number) {
		return Nongli.toChinaMonth(month || this._month);
	}
	// 转换为农历日
	toChinaDay(day?: number) {
		return Nongli.toChinaDay(day || this._day);
	}

	// 获取某月天数
	getMonthDays(month?: number) {
		const year = this._year;
		month = month || this._month;
		if (this._lifa === '农历') {
			return Nongli.monthDays(year, month);
		}
		return (new Date(year, month, 0)).getDate();
	}

	// 格式化日期字符串
	format(formatStr?: string) {
		let result = formatStr || this.formatStr;
		const { data } = this._matchFormat(result);

		Object.keys(data).forEach((key) => {
			result = result.replace(new RegExp(key, 'g'), data[key] || '');
		});
		return result;
	}
	// 匹配格式化字符串
	_matchFormat(formatStr?: string) {
		formatStr = formatStr || this.formatStr;
		const keyMatch: Record<string, string> = { 'YYYY': 'year', 'YY': 'year', 'MM': 'month', 'M': 'month', 'DD': 'day', 'D': 'day', 'HH': 'hour', 'H': 'hour', 'mm': 'miunte', 'm': 'miunte', 'ss': 'second', 's': 'second', }
		const { _lifa, _leap } = this;
		// 定义格式化字符对应的处理函数
		const formatMap: Record<string, () => string> = {
			'lifa': () => _lifa || '公历',
			'YYYY': () => this.getFullYear().toString().padStart(4, '0'),
			'YY': () => this.getFullYear().toString().slice(-2),
			'MM': () => (this.getMonth()).toString().padStart(2, '0'),
			'M': () => (this.getMonth()).toString(),
			'DD': () => this.getDate().toString().padStart(2, '0'),
			'D': () => this.getDate().toString(),
			'HH': () => (this.getHours() || 0).toString().padStart(2, '0'),
			'H': () => (this.getHours() || 0).toString(),
			'mm': () => (this.getMinutes() || 0).toString().padStart(2, '0'),
			'm': () => (this.getMinutes() || 0).toString(),
			'ss': () => (this.getSeconds() || 0).toString().padStart(2, '0'),
			's': () => (this.getSeconds() || 0).toString(),
			'leap': () => _leap && _lifa === '农历' ? `(闰${this._month}月)` : '',
		};
		const rex = new RegExp(Object.keys(formatMap).map(key => `(${key})`).join('|'), 'g');
		// 匹配formatStr中的所有格式化字符
		const keys = formatStr.match(rex);
		const fkey = keys?.filter(key => !['lifa', 'leap'].includes(key))
		const mkey = fkey?.map(key => keyMatch[key] || key)

		const data = {} as Record<string, string>;
		const list: any = [];
		keys?.forEach((key) => data[key] = formatMap[key]?.() || '');
		fkey?.forEach((key, i) => {
			const str = data[key] || '';
			const item = {
				fkey: key,
				mkey: mkey![i],
				str,
				int: +str,
			}
			if (item.mkey === 'month' && this._lifa == '农历' && this._leap) {
				item.int = -item.int;
			}

			return list.push(item)
		})

		return {
			lifa: this._lifa,
			leap: this._leap,
			fkey,
			mkey,
			data,
			list
		};
	}

	// 转换为字符串
	toString(formatStr?: string) {
		return this.format(formatStr || this.formatStr);
	}
	// 返回数组
	toArray() {
		return this._matchFormat().list;
	}
	// 返回json对象
	toJson() {
		return this._matchFormat();
	}
}
