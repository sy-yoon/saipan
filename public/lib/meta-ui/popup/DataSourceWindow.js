Ext.define('app.popup.DataSourceWindow', {
	extend : 'Ext.Window',
	layout : 'border',
	dataSource : null,

	initComponent : function() {
		var me = this;
		Ext.apply(this, {
			items : [{
						xtype : 'textfield',
						labelWidth : 150,
						fieldLabel : 'DS Name',
						region : 'north',
						itemId : 'dsNameField'
					}, {
						xtype : 'panel',
						title : 'SQL',
						region : 'center',
						layout : 'border',
						items : [{
									xtype : 'textareafield',
									region : 'center',
									itemId : 'sqlArea'
								}]
					}, {
						xtype : 'grid',
						title : 'Parameters',
						region : 'east',
						width : 300,
						split : true,
						columns : [{
									text : 'name',
									flex : 1,
									dataIndex : 'text'
								}, {
									text : 'type',
									flex : 1,
									dataIndex : 'type'
								}, {
									text : 'value',
									flex : 1,
									dataIndex : 'value'
								}]
					}],
			buttons : [{
				text : 'Test',
				handler : function(btn) {
					Ext.Ajax.request({
								url : '/emf/common',
								async : true,
								method : 'post',
								params : {
									sqlId : 'getAqBizAreaList'
								},

								success : function(response) {
									var ret = Ext.decode(response.responseText);
									if (!Ext.isEmpty(ret['data'])) {
										me.dataSource = {
											dsName : me.down('#dsNameField').getValue(),
											fields : ret['data']
										}
									}
								}
							});
				}
			}, {
				text : 'Cancel',
				handler : function(btn){
					me.close();
				}
			}, {
				text : 'Ok',
				handler : function(btn){
					me.close();
				}
			}]

		});

		this.callParent(arguments);
	}
});
