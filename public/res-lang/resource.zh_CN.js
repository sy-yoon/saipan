(function(global) {
	var MENU = global.MENU = global.MENU || {};
	global.MENU = {
		DEFINE : {
			HEADER : '定义',
			LB001 : '业务域',
			LB002 : '规则',
			LB003 : '规则集',
			LB004 : 'SQI',
			LB005 : '违规记录'
		},
		
		
		ANAL_STATIS : {
			HEADER : '分析 & 统计',
			LB001 : {
				HEADER : '分析',
				LB001 : '业务域',
				LB002 : '规则',
				LB003 : 'SQI',
				LB004 : '违规记录'
			},
			
			LB002 : {
				HEADER : '统计',
				LB001 : 'SQL 信息',
				LB002 : 'Top Referenced Table',
				LB003 : 'Top Referenced Column',
				LB004 : '访问路径',
				LB005 : 'Sql Exceptions',
				LB006 : 'Table-Sql'
				
			}
		},
		
		SYSTEM : {
			HEADER : '系统管理',
			LB001 : {
				HEADER : '任务管理',
				LB001 : 'Sql收集',
				LB002 : 'Schema收集',
				LB003 : '验证',
				LB004 : 'Sql-Delete'
			},
			
			LB002 : 'Agent 管理',
			LB003 : '用户管理'
		}
	}
    	
    	
    var LB = global.LB = global.LB || {};
    global.LB = {
    	
        MSG: {
            
        },
        
        COMMON:{
        	ADD : '添加',
            EDIT : '修改',
            REMOVE : '移除',
            REMOVE_ALL: '全部移除',
            DELETE : '删除',
            SEARCH : '查询',
            SAVE : '保存',
            CLOSE : '关闭',
            DESCRIPTION : '描述',
            AREA_SEL : '选择业务域',
            TRGT_SEL : '选择目标系统',
            OBJ_SEL : '对象类型',
            ORDER_BY : '排序',
            ORDER : '排序',
            CPU_TIME : 'CPU Time (sec)',
        	ELAPSED_TIME : 'Elapsed Time(sec)',
        	DISK_READS : 'Disk Reads (byte)',
        	BUFFER_GETS: 'Buffer Gets',
        	EXECUTIONS : 'Executions',
            DESC : 'Top',
            ASC : '底部',
            ENTRIES : '记录',
            OVER : 'Over',
            SYSTEM : '系统',
            IP : 'IP',
            SCHEMA : 'Schema',
            OBJECT : '对象',
            LOAD_DT : 'Date Time',
            SQL_ID : 'SQL ID',
            SQL : 'SQL',
            TABLE : '表',
            COLUMN : '列',
            BIZAREA : '业务域',
            MORE : '更多信息 ',
            CHECKALL : '选择全部',
            SAVE_OK : '保存了项目',
            REMOVE_OK : '删除了项目',
            RULE : '规则',
            LINE : 'Line',
            EXCEL : 'Excel',
            MOVE : 'Move',
            OK : 'Ok',
            CANCEL : 'Cancel',
            ARE_U_SURE : 'Are you sure?',
            ENTRY_SEL : 'Select Entry',
            IS_NEW : 'Is New',
            IS_ANLD : 'Is Anl',
            ANLD : 'Analyzed',
            NO_ANLD : 'No Analyzed'
        },
        
        MENU: {
        	MENU0001 : '定义' 	   
        },
        
        DASHBOARD:{
        	LB001 : 'New SQL',
        	LB002 : 'Total SQL',
        	LB003 : 'SQL Exception',
        	LB004 : 'Dropped Table',
        	LB005 : 'SQL',
        	LB006 : 'Type',
        	LB007 : 'Name',
        	LB008 : 'IP',
        	LB009 : 'Schema',
        	LB010 : 'BizArea SQL',
        	LB011 : 'BizArea Score',
        	LB012 : 'Total SQL',
        	LB013 : 'AP SQL',
        	LB014 : 'DBMS SQL',
        	LB015 : 'SQI Score',
        	LB016 : 'Rule Score',
        	LB017 : 'Top5 CPU Time Sql',
        	LB018 : 'Top5 Executioins Sql',
        	LB019 : 'Top5 Referenced Table',
        	LB020 : 'Agent Status',
        	LB021 : 'Biz Score',
        	TITLE : 'DASHBOARD'
        },
        AREA:{
        	LB001 : 'New SQL',
        	LB002 : 'New Table',
        	LB003 : 'Altered Column',
        	LB004 : 'Dropped Table',
        	LB005 : 'SQL',
        	LB006 : 'Type',
        	LB007 : 'Name',
        	LB008 : 'IP',
        	LB009 : 'Schema',
        	LB010 : 'SQL',
        	LB011 : 'Area Score',
        	LB012 : 'Total SQL',
        	LB013 : 'AP SQL',
        	LB014 : 'DBMS SQL',
        	LB015 : '业务领域',
        	LB016 : 'Remove Sql',
        	LB017 : 'Date Time',
        	TITLE : '业务领域'
        },
        TRGT:{
        	LB001 : 'WBP APP SERVER',
        	LB002 : 'DBMS',
        	LB003 : '应用程序源代码',
        	LB004 : '系统名',
        	LB005 : 'IP地址',
        	LB006 : '包',
        	LB007 : 'Schema',
        	LB008 : 'SQL 收集周期',
        	LB009 : 'Path',
        	LB010 : 'Port',
        	LB011 : 'Service',
        	LB012 : 'DBMS Type',
        	LB013 : 'User Id',
        	LB014 : 'Password',
        	LB015 : '数据库',
        	TITLE : '系统'
        },
        TRGT_SQL:{
        	LB001 : 'WBP APP SERVER',
        	LB002 : 'DBMS',
        	LB003 : '应用程序源代码',
        	LB004 : '名称',
        	LB005 : 'IP',
        	LB006 : 'Schema',
        	LB007 : 'SQL_ID',
        	LB008 : 'SQL (4000 byte)',
        	TITLE : 'SQL列表'
        },
        
        FILE_LIST : {
        	LB001 : 'File Name',
        	LB002 : 'Application Source'
        },
        
        FILE : {
        	LB001 : 'File Name',
        	LB002 : 'SQL List',
        	LB003 : 'SQL Script'
        },
        
        VERSION:{
        	LB001 : '违规记录',
        	LB002 : '基线',
        	TITLE : '违规记录SQL'
        },
        
        SQL:{
        	LB001 : 'SQL',
            LB002 : 'SQL参数',
            LB003 : 'Call Stack',
            LB004 : 'Plan Tree',
            LB005 : 'Date Time',
            LB006 : 'Parameter',
            LB007 : 'Elapsed Time',
            LB008 : 'Stack',
            LB009 : 'SQL脚本',
            LB010 : 'SQL分析',
            LB011 : 'Status',
            LB012 : 'Cause Text',
            LB013 : 'Content processing',
            LB014 : '分析',
            LB015 : 'SQL执行历史记录',
            LB016 : 'SQL-Table',
            LB017 : 'Total CPU Time(sec)',
            LB018 : 'Total Elapsed Time(sec)'
        },
        
        TABLE_INFO: {
            LB001: '表信息.',
            LB002: '表信息',
            LB003: 'Constraint Key',
            LB004: 'Index Key',
            LB005: 'Columns',
            LB006: '数据类型',
            LB007: '长度',
            LB008: 'Not Null',
            LB009: 'PK',
            LB010: 'Column Name',
            LB011: 'Const Type',
            LB012: 'Search Condition',
            LB013: 'Order',
            LB014: '索引键列',
            LB015: '键顺序序号',
            LB016: 'Descend',
            LB017: '分区',
            LB018: '临时',
            LB019: 'BLOCKS',
            LB020: 'BLOCK BYTES',
            LB021: 'EMPTY BLOCKS',
            LB022: 'NUM ROWS',
            LB023: 'AVG SPACE',
            LB024: 'CHAIN CNT',
            LB025: 'AVG ROW LEN',
            LB026: 'AVG SPACE FREELIST BLOCKS',
            LB027: 'SAMPLE SIZE',
            LB028: '访问路径',
            LB029 : 'Operator',
            LB030 : 'Count',
        	LB031 : 'Const.'
            
        },
        
        RULE:{
        	LB001 : '语言',
        	LB002 : '规则名',
        	LB003 : '类名',
        	LB004 : '优先级',
        	LB005 : '消息',
        	LB006 : '实例',
        	LB007 : '属性列表',
        	LB008 : '属性名',
        	LB009 : '属性类型',
        	LB010 : '属性值',
        	LB011 : '规则',
        	TITLE : '规则列表'
        },
        
        RULESET:{
        	LB001 : '规则集名称',
        	LB002 : '规则集',
        	LB003 : '映射规则',
        	TITLE : '规则集列表'
        },
        
        SQI:{
        	LB001 : 'SQI名称',
        	LB002 : 'SQI',
        	TITLE : 'SQI列表'
        },
        
        ANALY: {
        	LB001 : '分数',
        	LB002 : 'Error File',
            LB003 : 'Error Rule',
            LB004 : 'Total File',
            LB005 : 'Total Rule',
            LB006 : '错误计数',
        	TITLE : ''
        },
        
        STATIS : {
        	
        	LB001 : 'Referenced Count',
        	LB002 : '操作符',
        	LB003 : 'Const.',
        	LB004 : 'Top Referenced Table List',
        	LB005 : 'Top Referenced Column List',
        	LB006 : '访问路径',
        	LB007 : 'Sql Error',
        	LB008 : 'Parameters',
        	LB009 : 'Table Search',
        	LB010 : 'Table-Sql',
        	LB011 : 'Add BlackList'
        },
        
        JOB :{
        	LB001 : '任务名称',
        	LB002 : '任务类别',
        	LB003 : '周期',
        	LB004 : '目标系统计数',
        	LB005 : 'SQL/SQL-PLAN',
        	LB006 : 'DB-SCHEMA',
        	LB007 : 'ISPT',
        	LB008 : '任务历史',
        	LB009 : '单次',
        	LB010 : 'Min',
        	LB011 : 'Hour',
        	LB012 : 'Day',
        	LB013 : 'Week',
        	LB014 : 'Month',
        	LB015 : 'Job Start Time',
        	LB016 : '(分钟)周期',
        	LB017 : '(小时)周期',
        	LB018 : '开始时间 ',
        	LB019 : '(日)周期',
        	LB020 : 'Mon-Fri',
        	LB021 : 'Day',
        	LB022 : '(月)周期',
        	LB023 : '星期',
        	LB024 : 'Target System',
        	LB025 : 'Processing',
        	LB026 : 'Suceess',
        	LB027 : 'Fail',
        	LB028 : 'Elapsed Time(sec)',
        	LB029 : '任务列表',
        	LB030 : '提交',
        	LB031 : 'Prev Fire Time',
        	LB032 : 'Next Fire Time'
        },
        
        JOB_SCHEMA :{
        	TITLE : 'DB-Schema 任务',
        	LB001 : 'DB-Schema 任务列表'
        },
        
        JOB_SQL :{
        	TITLE : 'SQL/Plan 任务',
        	LB001 : 'SQL/Plan 任务列表'
        },
        
        JOB_ISPT :{
        	TITLE : '验证任务',
        	LB001 : '验证任务列表',
        	LB002 : '规则集'
        },
        
        JOB_HST : {
        	TITLE : '任务执行历史',
        	LB001 : '启动日期时间',
        	LB002 : '结束日期时间',
        	LB003 : '任务状态'
        },
        
        AGENT :{
        	TITLE : 'WAS Agent',
        	LB001 : 'Agent名称',
        	LB002 : '路径',
        	LB003 : '状态',
        	LB004 : 'Count'
        },
        
        USER : {
        	TITLE : '用户列表',
        	LB001 : '用户名称',
        	LB002 : 'Id',
        	LB003 : 'Password',
        	LB004 : '电子邮件'
        	
        }
    };    
})(window);