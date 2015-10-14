(function(global) {
	var MENU = global.MENU = global.MENU || {};
	global.MENU = {
		DEFINE : {
			HEADER : 'Define',
			LB001 : 'Biz Area',
			LB002 : 'Rules',
			LB003 : 'Ruleset',
			LB004 : 'SQI',
			LB005 : 'Blacklist'
		},
		
		
		ANAL_STATIS : {
			HEADER : 'Analysis & Statistics',
			LB001 : {
				HEADER : 'Analysis',
				LB001 : 'Biz Area',
				LB002 : 'Rules',
				LB003 : 'SQI',
				LB004 : 'Blacklist'
			},
			
			LB002 : {
				HEADER : 'Statistics',
				LB001 : 'SQL Info',
				LB002 : 'Top Referenced Table',
				LB003 : 'Top Referenced Column',
				LB004 : 'Access Path',
				LB005 : 'Sql Exceptions',
				LB006 : 'Table-Sql'
			}
		},
		
		SYSTEM : {
			HEADER : 'System Management',
			LB001 : {
				HEADER : 'Job Management',
				LB001 : 'Sql-Collect',
				LB002 : 'Schema-Collect',
				LB003 : 'Inspection',
				LB004 : 'Sql-Delete'
			},
			
			LB002 : 'Agent Management',
			LB003 : 'User Management'
		}
		
		
		
	}
    	
    	
    var LB = global.LB = global.LB || {};
    global.LB = {
    	
        MSG: {
            
        },
        
        COMMON:{
        	ADD : 'Add',
            EDIT : 'Edit',
            REMOVE : 'Remove',
            REMOVE_ALL: 'Remove All',
            DELETE : 'Delete',
            SEARCH : 'Search',
            SAVE : 'Save',
            CLOSE : 'Close',
            DESCRIPTION : 'Description',
            AREA_SEL : 'Select BizArea',
            TRGT_SEL : 'Select Target',
            OBJ_SEL : 'Object Type',
            ORDER_BY : 'Order By',
            ORDER : 'Order',
            CPU_TIME : 'CPU Time (sec)',
        	ELAPSED_TIME : 'Elapsed Time(sec)',
        	DISK_READS : 'Disk Reads (byte)',
        	BUFFER_GETS: 'Buffer Gets',
        	EXECUTIONS : 'Executions',
            DESC : 'Top',
            ASC : 'Bottom',
            ENTRIES : 'Entries',
            OVER : 'Over',
            SYSTEM : 'System',
            IP : 'IP',
            SCHEMA : 'Schema',
            OBJECT : 'Object',
            LOAD_DT : 'Date Time',
            SQL_ID : 'SQL ID',
            SQL : 'SQL',
            TABLE : 'Table',
            COLUMN : 'Column',
            BIZAREA : 'Biz Area',
            MORE : 'More Info ',
            CHECKALL : 'Check All',
            SAVE_OK : 'Saved Item',
            REMOVE_OK : 'Saved Item',
            RULE : 'Rule',
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
        	MENU0001 : 'Definition' 	   
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
        	LB015 : 'Business Area',
        	LB016 : 'Remove Sql',
        	LB017 : 'Date Time',
        	TITLE : 'Business Areas'
        },
        TRGT:{
        	LB001 : 'WBP APP SERVER',
        	LB002 : 'DBMS',
        	LB003 : 'APPLICATION SOURCE',
        	LB004 : 'System Name',
        	LB005 : 'IP Address',
        	LB006 : 'Package',
        	LB007 : 'Schema',
        	LB008 : 'SQL gathering cycle',
        	LB009 : 'Path',
        	LB010 : 'Port',
        	LB011 : 'Service',
        	LB012 : 'DBMS Type',
        	LB013 : 'User Id',
        	LB014 : 'Password',
        	LB015 : 'Database',
        	TITLE : 'System'
        },
        TRGT_SQL:{
        	LB001 : 'WBP APP SERVER',
        	LB002 : 'DBMS',
        	LB003 : 'APPLICATION SOURCE',
        	LB004 : 'Name',
        	LB005 : 'IP',
        	LB006 : 'Schema',
        	LB007 : 'SQL_ID',
        	LB008 : 'SQL (4000 byte)',
        	TITLE : 'SQL List'
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
        	LB001 : 'Blacklist',
        	LB002 : 'Baseline',
        	TITLE : 'Blacklist SQL'
        },
        
        SQL:{
        	LB001 : 'SQL',
            LB002 : 'SQL Parameters',
            LB003 : 'Call Stack',
            LB004 : 'Plan Tree',
            LB005 : 'Date Time',
            LB006 : 'Parameter',
            LB007 : 'Elapsed Time',
            LB008 : 'Stack',
            LB009 : 'SQL Script',
            LB010 : 'SQL Analysis',
            LB011 : 'Status',
            LB012 : 'Cause Text',
            LB013 : 'Content processing',
            LB014 : 'Analyst',
            LB015 : 'SQL History',
            LB016 : 'SQL-Table',
            LB017 : 'Total CPU Time(sec)',
            LB018 : 'Total Elapsed Time(sec)'
        },
        
        TABLE_INFO: {
            LB001: 'Table Info.',
            LB002: '테이블 정보',
            LB003: 'Constraint Key',
            LB004: 'Index Key',
            LB005: 'Columns',
            LB006: 'Data Type',
            LB007: 'Length',
            LB008: 'Not Null',
            LB009: 'PK',
            LB010: 'Column Name',
            LB011: 'Const Type',
            LB012: 'Search Condition',
            LB013: 'Order',
            LB014: '인덱스 키 컬럼',
            LB015: '키 순번',
            LB016: 'Descend',
            LB017: 'PARTITIONED',
            LB018: 'TEMPORARY',
            LB019: 'BLOCKS',
            LB020: 'BLOCK BYTES',
            LB021: 'EMPTY BLOCKS',
            LB022: 'NUM ROWS',
            LB023: 'AVG SPACE',
            LB024: 'CHAIN CNT',
            LB025: 'AVG ROW LEN',
            LB026: 'AVG SPACE FREELIST BLOCKS',
            LB027: 'SAMPLE SIZE',
            LB028: 'Access Path',
            LB029 : 'Operator',
            LB030 : 'Count',
        	LB031 : 'Const.'
            
        },
        
        RULE:{
        	LB001 : 'Language',
        	LB002 : 'Rule Name',
        	LB003 : 'Class Name',
        	LB004 : 'Priority',
        	LB005 : 'Message',
        	LB006 : 'Example',
        	LB007 : 'Property List',
        	LB008 : 'Property Name',
        	LB009 : 'Property Type',
        	LB010 : 'Property Value',
        	LB011 : 'Rule',
        	TITLE : 'Rule List'
        },
        
        RULESET:{
        	LB001 : 'Ruleset Name',
        	LB002 : 'Ruleset',
        	LB003 : 'Mapping Rule',
        	TITLE : 'Ruleset List'
        },
        
        SQI:{
        	LB001 : 'SQI Name',
        	LB002 : 'SQI',
        	TITLE : 'SQI List'
        },
        
        ANALY: {
        	LB001 : 'Score',
        	LB002 : 'Error File',
            LB003 : 'Error Rule',
            LB004 : 'Total File',
            LB005 : 'Total Rule',
            LB006 : 'Error Count',
        	TITLE : ''
        },
        
        STATIS : {
        	
        	LB001 : 'Referenced Count',
        	LB002 : 'Operator',
        	LB003 : 'Const.',
        	LB004 : 'Top Referenced Table List',
        	LB005 : 'Top Referenced Column List',
        	LB006 : 'Access Path',
        	LB007 : 'Sql Error',
        	LB008 : 'Parameters',
        	LB009 : 'Table Search',
        	LB010 : 'Table-Sql',
        	LB011 : 'Add BlackList'
        },
        
        JOB :{
        	LB001 : 'Job Name',
        	LB002 : 'JOb Type',
        	LB003 : 'Cycle',
        	LB004 : 'Target Count',
        	LB005 : 'SQL/SQL-PLAN',
        	LB006 : 'DB-SCHEMA',
        	LB007 : 'ISPT',
        	LB008 : 'JOb History',
        	LB009 : 'Once',
        	LB010 : 'Min',
        	LB011 : 'Hour',
        	LB012 : 'Day',
        	LB013 : 'Week',
        	LB014 : 'Month',
        	LB015 : 'Job Start Time',
        	LB016 : '(분)주기',
        	LB017 : '(시)주기',
        	LB018 : 'Start Time',
        	LB019 : '(일)주기',
        	LB020 : 'Mon-Fri',
        	LB021 : 'Day',
        	LB022 : '(월)주기',
        	LB023 : '요일',
        	LB024 : 'Target System',
        	LB025 : 'Processing',
        	LB026 : 'Suceess',
        	LB027 : 'Fail',
        	LB028 : 'Elapsed Time(sec)',
        	LB029 : 'Job List',
        	LB030 : 'Apply',
        	LB031 : 'Prev Fire Time',
        	LB032 : 'Next Fire Time'
        },
        
        JOB_SCHEMA :{
        	TITLE : 'DB-Schema Job',
        	LB001 : 'DB-Schema Job List'
        },
        
        JOB_SQL :{
        	TITLE : 'SQL/Plan Job',
        	LB001 : 'SQL/Plan Job List'
        },
        
        JOB_ISPT :{
        	TITLE : 'Inspection Job',
        	LB001 : 'Inspection Job List'
        },
        
        JOB_HST : {
        	TITLE : 'Job History',
        	LB001 : 'Started DateTime',
        	LB002 : 'Finished DateTime',
        	LB003 : 'Job Status'
        },
        
        AGENT :{
        	TITLE : 'WAS Agent',
        	LB001 : 'Agent Name',
        	LB002 : 'Directory',
        	LB003 : 'Status',
        	LB004 : 'Count'
        },
        
        USER : {
        	TITLE : 'User List',
        	LB001 : 'User Name',
        	LB002 : 'Id',
        	LB003 : 'Password',
        	LB004 : 'Email'
        	
        }
    };    
})(window);