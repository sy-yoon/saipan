/***********************************************
 * File Name    : Struct.js
 * Author       : sukyong, yoon
 * Date         : 2012-02-24
 * Descript     : 
***********************************************/
 function openModel(areaid, expireddate)
 {
	getModelLevel(areaid, expireddate);
 }
 
 function getModelLevel(areaid, expireddate)
 {
	 Ext.Ajax.request(
		{
	        async: false,
	        method : 'POST',
	        scope : this,
	        url : 'jsonData.action',
	        params : {
				bizArea : 'common',
	            areaid : areaid,
	            expireddate : expireddate,
	            sqlId : 'getModelLevel'                             
	        },
	        success: function(response) {
	            var obj = Ext.JSON.decode(response.responseText);
	            if(obj['success'] = 'true' && obj['total'] == 1)
	            {
		            var model = new Model();
		        	model.newPane();
		        	document.Model = model;
		        	
		        	
		        	var canvas = document.SHCanvas;
		        	canvas.Pane = document.Model.getMainPane();
					canvas.Canvas.width = obj['rows'][0]['RIGHTPOS'];
					canvas.Canvas.height = obj['rows'][0]['BOTTOMPOS'];	
		        	getEntityList(areaid, expireddate);
	            }
	        }
		}
	 );
 }
 
 function getRectFigure(areaid, expireddate)
 {
	Ext.Ajax.request(
		{
			async: false,
			method : 'POST',
			scope : this,
			url : 'jsonData.action',
			params : {
				bizArea : 'common',
			    areaid : areaid,
			    expireddate : expireddate,
			    sqlId : 'getRectFigure'                             
		    },
			success: function(response) {
			    var obj = Ext.JSON.decode(response.responseText);
			    if(obj['success'] = 'true' && obj['total'] > 0)
	            {
			    	var canvas = document.SHCanvas;
			    	var model = canvas.Pane.Model;
			    	var count = obj['total'];
			    	var i = 0;
			    	var rows = obj['rows'];
			    	for(i=0; i<count; i++)
			    	{
			    		var vEssence = new VEssence();
				    	vEssence.Rect.Left = vEssence.Track_Rect.Left = rows[i]['LEFT'];
				    	vEssence.Rect.Top = vEssence.Track_Rect.Top = rows[i]['TOP'];
				    	vEssence.Rect.Right = vEssence.Track_Rect.Right = rows[i]['RIGHT'];
				    	vEssence.Rect.Bottom = vEssence.Track_Rect.Bottom = rows[i]['BOTTOM'];
				    	canvas.Pane.addLogicalVisualObject(vEssence);
				    	vEssence.Essence = model.LDataObjects[rows[i]['REFENTID']];
				    	vEssence.Essence.Visuals.push(vEssence);
			    	}
			    	
			    	canvas.refresh(null);
	            }
			}
		}
	);
 }
 
 function getRelFigure(areaid, expireddate)
 {
	Ext.Ajax.request(
		{
			async: false,
			method : 'POST',
			scope : this,
			url : 'jsonData.action',
			params : {
				bizArea : 'common',
			    areaid : areaid,
			    expireddate : expireddate,
			    sqlId : 'getRelFigure'                             
		    },
			success: function(response) {
			    var obj = Ext.JSON.decode(response.responseText);
			    if(obj['success'] = 'true' && obj['total'] > 0)
	            {
			    	var canvas = document.SHCanvas;
			    	var model = canvas.Pane.Model;
			    	var count = obj['total'];
			    	var i = 0;
			    	var rows = obj['rows'];
			    	
			    	var vRelationship = null;
			    	for(i=0; i<count; i++)
			    	{
			    		if(0 == rows[i]['TYPE'])
			    		{
			    			vRelationship = new VRelationship(); 
			    			var pts = rows[i]['POS'].split(' ');
			    			if(pts != null && pts.length > 0)
			    			{
			    				for(var j=0; j<pts.length; j++)
			    				{
			    					var pt = pts[j].split(',');
			    					vRelationship.Points.push(new Point(pt[0], pt[1]));
			    				}	
			    			}
					    	canvas.Pane.addLogicalVisualObject(vRelationship);
					    	vRelationship.Relationship = model.LDataObjects[rows[i]['REF_ID']];
					    	vRelationship.Relationship.Visuals.push(vRelationship);
			    		}
			    		
			    	}
			    	
			    	canvas.refresh(null);
	            }
			}
		}
	);
 }

 function getEntityList(areaid, expireddate)
 {
	Ext.Ajax.request(
		{
			async: false,
			method : 'POST',
			scope : this,
			url : 'jsonData.action',
			params : {
				bizArea : 'common',
			    areaid : areaid,
			    expireddate : expireddate,
			    sqlId : 'getEntityList'                             
		    },
			success: function(response) {
			    var obj = Ext.JSON.decode(response.responseText);
			    if(obj['success'] = 'true' && obj['total'] > 0)
	            {
			    	var rows = obj['rows'];
			    	var canvas = document.SHCanvas;
			    	var model = canvas.Pane.Model;
			    	var count = obj['total'];
			    	var i;
			    	
			    	for(i=0; i<count; i++)
			    	{
			    		var essence = new Essence();
			    		essence.EntityName = rows[i]['NM'];
			    		essence.LId = rows[i]['ID'];
			    		essence.TableName = "Table";
				    	model.addLogicalDataObject(essence);
			    	}
			    	getRectFigure(areaid, expireddate);
			    	getAttributeList(areaid, expireddate);
			    	
	            }
			}
		}
	);
 }
 
 function getAttributeList(areaid, expireddate)
 {
	Ext.Ajax.request(
		{
			async: false,
			method : 'POST',
			scope : this,
			url : 'jsonData.action',
			params : {
				bizArea : 'common',
			    areaid : areaid,
			    expireddate : expireddate,
			    sqlId : 'getAttributeList'                             
		    },
			success: function(response) {
			    var obj = Ext.JSON.decode(response.responseText);
			    if(obj['success'] = 'true' && obj['total'] > 0)
	            {
			    	var rows = obj['rows'];
			    	var canvas = document.SHCanvas;
			    	var model = canvas.Pane.Model;
			    	var count = obj['total'];
			    	var i;
			    	var essence = null;
			    	var vEssence = null;
			    	var essenceId = '';
			    	for(i=0; i<count; i++)
			    	{
			    		var attribute = new Attribute();
			    		if(essenceId != rows[i]['ENT_ID'])
			    		{
			    			essenceId = rows[i]['ENT_ID'];
			    			essence = model.LDataObjects[essenceId];
			    		}
			    		attribute.AttrName = rows[i]['NM'];
			    		attribute.Id = rows[i]['ID'];
			    		attribute.Essence = essence;
			    		essence.Attributes.push(attribute);
			    		
			    		var vAttribute = new VAttribute();
			    		vAttribute.VEssence = essence.Visuals[0];
			    		vAttribute.Attribute = attribute;
			    		vAttribute.VEssence.VAttributes.push(vAttribute);
			    	}
			    	canvas.refresh(null);
			    	getRelationshipList(areaid, expireddate);
	            }
			}
		}
	);
 }
 
 function getRelationshipList(areaid, expireddate)
 {
	Ext.Ajax.request(
		{
			async: false,
			method : 'POST',
			scope : this,
			url : 'jsonData.action',
			params : {
				bizArea : 'common',
			    areaid : areaid,
			    expireddate : expireddate,
			    sqlId : 'getRelationshipList'                             
		    },
			success: function(response) {
			    var obj = Ext.JSON.decode(response.responseText);
			    if(obj['success'] = 'true' && obj['total'] > 0)
	            {
			    	var rows = obj['rows'];
			    	var canvas = document.SHCanvas;
			    	var model = canvas.Pane.Model;
			    	var count = obj['total'];
			    	var i;
			    	
			    	var relationship = null;
			    	for(i=0; i<count; i++)
			    	{
			    		if(0 == rows[i]['FIG_TYP'])
			    		{
			    			relationship = new Relationship();
			    			relationship.LId = rows[i]['ID'];
				    		relationship.LName = rows[i]['NM'];
				    		relationship.ParentEssence = model.LDataObjects[rows[i]['P_ID']];
				    		relationship.ChildEssence = model.LDataObjects[rows[i]['C_ID']];
				    		relationship.Uidinherit = rows[i]['UIDINHERIT'];
				    		relationship.ParentEssence.RelationshipList.push(relationship);
				    		model.addLogicalDataObject(relationship);
			    		}
			    		else if(1 == rows[i]['FIG_TYP'])
			    		{
			    			relationship = new RelationshipSelf();
			    		}
			    		else if(2 == rows[i]['FIG_TYP'])
			    		{
			    			relationship = new RelationshipExcl();
			    		}
			    		else
			    		{
			    			// Error
			    		}
			    	}
			    	
			    	getRelFigure(areaid, expireddate);
	            }
			}
		}
	);
 }
 
function intersectRect(rect1,rect2)
{
	if(rect1 == null || rect1 == null)
		return false;
		
	if( (rect1.Left < rect2.Left && rect2.Left < rect1.Right) &&
		(rect1.Top < rect2.Top && rect2.Top < rect1.Bottom) )
			return true;
			
	if( (rect1.Left < rect2.Right && rect2.Right < rect1.Right) &&
		(rect1.Top < rect2.Top && rect2.Top < rect1.Bottom) )
			return true;
			
	if( (rect1.Left < rect2.Right && rect2.Right < rect1.Right) &&
		(rect1.Top < rect2.Bottom && rect2.Bottom < rect1.Bottom) )
			return true;
			
	if( (rect1.Left < rect2.Left && rect2.Left < rect1.Right) &&
		(rect1.Top < rect2.Bottom && rect2.Bottom < rect1.Bottom) )
			return true;
	
	return false;
}


