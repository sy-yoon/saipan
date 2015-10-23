Ext.define('app.popup.GridEditWindow', {
			extend : 'Ext.Window',
			layout : 'border',

			initComponent : function() {
				var me = this;
				Ext.apply(this, {
							items : [{
										xtype : 'grid',
										region : 'west',
										store : me.createStore(),
										width : 350,
										split : true,
										columns : [{
													text : 'Column',
													flex : 1,
													dataIndex : 'text'
												}],
										buttons : [{
													text : 'New',
													handler : function(bnt) {
														me.store.add({
																	text : 'col',
																	width : 100,
																	dataIndex : ''
																});
													}
												}, {
													text : 'Remove'
												}, {
													text : 'Up'
												}, {
													text : 'Down'
												}],
										listeners: {
											selectionchange : {
												fn : function(model,selected,eopt) {
													var prptGrid = me.down('#prptGrid');
													prptGrid.setSource(selected[0].data);
												}
											}
										}
									}, {
										xtype : 'propertygrid',
										region : 'center',
										itemId : 'prptGrid'

									}],
							buttons : [{
										text : 'Ok',
										handler : function(btn){
											for(var i=0; i<me.store.count(); i++){
												me.grid.Properties['columns'][i] = me.store.getAt(i).data;	
											}
											me.close(); 
										}
									}, {
										text : 'Cancel'
									}]
						});

				this.callParent(arguments);
			},

			createStore : function() {
				var me = this;
				me.store = Ext.create('Ext.data.Store', {
							storeId : 'gridColStore',
							fields : ['text', 'width', 'dataIndex', 'sortable',
									'hidden'],
							data : me.grid.Properties['columns']
						});
						
				
				return me.store;
			}
		});