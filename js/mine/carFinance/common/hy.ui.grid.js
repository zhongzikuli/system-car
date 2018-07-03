(function($){
	var carGrid = function (option, callback){
		//初始化组件
		initComponent(option);
		
		//初始化数据
		//initData(option);
		return this;
	}
	function initPlugin(column) {
    	if(column.chosenSelect){
     		//下拉框初始化
              var config = {
                  disable_search_threshold: 10,
                  no_results_text: '无数据'
              };
              //下拉框
              $("#"+column.id).chosen(config);
     	 }
    }
	//初始化表格
	function initComponent (option){
		if(option.columns){
			var html = '<table class="table table-hover table-striped table-more" style="border: 1px solid #ddd;">';
			html += theadHtml(option.columns);
			html +='</table>';
			if(option.pagination){
				html +='<div id="pagination" class="pagination"></div>';
			}
			$(option.id).append(html);
		}
		initData(option, currPage, null)
	}
	function theadHtml(columns){
		var thHtml='';
		thHtml+='<thead><tr>';
		for(var i = 0;i <columns.length; i++){
			var column = columns[i];
			if(i = 0){
				if(column.type=='checkbox'){
					thHtml+='<th '+(column.width ? ' style="width:'+column.width+'%"' : '')+'><input type="'+column.type+'" class="checkAll"></th>';
				}
			}else{
				thHtml+='<th '+(column.width ? ' style="width:'+column.width+'%"' : '')+'>'+column.text+'</th>';
			}
			thHtml+='<th '+(column.width ? ' style="width:'+column.width+'%"' : '')+'>'+column.text+'</th>';
		}
		thHtml+='</tr></thead><tbody></tbody>';
		return thHtml;
	}
	
	function initData(option, currPage, jg){
		var pageSize = 10;		//每页显示条数初始化，修改显示条数，修改这里即可
		var initFlag = true;	//是否为初始化第一页标记
		$.ajax({
	        url: option.url,
	        type: option.type,
	        dataType: 'json',
	        data: {
	        	'pageNum': currPage,
	            'numPerPage': pageSize
	        },
	        success: function (data) {
	            if (data.error == 1) {
	                if (data["rows"] != null && data["rows"]["totalCount"] > 0) {
	                    if(option.pagination){
	                    	if (initFlag) {
		                        $("#pagination").pagination(data["rows"]["totalCount"], {
			                         items_per_page: pageSize,
			                         num_edge_entries: 1,
			                         num_display_entries: 8,
			                         callback: function (currPage, jg) {
			                        	 initData(option, currPage, jg);
			                         }//回调函数
			                     });
	                    	 }
	                    }
	                    loadTbody(data.rows,option)
	                } else {
	                    $(".table-more tbody").html("<tr><td class='col-td' colspan='"+option.columns.length+"'>暂无数据</td></tr>");
	                    $("#pagination").html("");
	                }
	            }else if (data.error == -100) {
	            	faildMsg("会话超时，请重新登陆！");
	            } else if (data.error == -1) {
	            	faildMsg(data.message);
	            }
	        },
	        error: function () {
	            $(".table-more tbody").html("<tr><td class='col-td' colspan='"+option.columns.length+"'>暂无数据</td></tr>");
	        }
	    });
	}
	function loadTbody(rows, option){
		var columns = option["columns"];
	    var tdHtml = "";
        for (var j = 0; j < rows.length; j++) {
        	var row=rows[j];
        	tdHtml += '<tr>';
        	for(var m=0;i < columns.length;m++){
        		var column = columns[m]
        		if(i = 0){
        			if(column.type=='checkbox'){
        				tdHtml+='<td><input type="'+column.type+'" class="checkOne"></td>';
        			}
        		}else{
        			if(column.type && column.type!==''){
            			var type = column.type
            			if(type =="text"){
            				tdHtml += '<td class="cel"><input type="'+type+'"/></td>';
            			}
            			if(type =="select"){
            				tdHtml += '<td class="cel"><select data-placeholder="选择..." class="chosen-select" '+(column.id ? 'id="' + column.id + '"' : '')+'>';
            				if (column.data) {
            		            for (var m = 0; m < column.data.length; m++) {
            		                if (column.displayField && column.valueField) {
            		                    if (column.defaultValue == column.data[m][tdHtml.valueField]) {
            		                    	tdHtml += '<option value="' + column.data[m][column.valueField] + '" selected = "selected" >' + column.data[m][column.displayField] + '</option>';
            		                    } else {
            		                    	tdHtml += '<option value="' + column.data[m][column.valueField] + '" >' + column.data[m][column.displayField] + '</option>';
            		                    }
            		                } else {
            		                    if (column.defaultValue == column.data[m]['value']) {
            		                    	tdHtml += '<option value="' + column.data[m]['value'] + '" selected = "selected">' + column.data[m]['name'] + '</option>';
            		                    } else {
            		                    	tdHtml += '<option value="' + column.data[m]['value'] + '" >' + column.data[m]['name'] + '</option>';
            		                    }
            		                }
            		            }
            		        } else if (column.url) {
            		            $.ajax({
            		                url		: column.url,
            		                type	: "post",
            		                dataType: "json",
            		                async	: column.async,
            		                success	: function (result) {
            		                	if (result.error == 1) {
            		                        var record = result["rows"];
            		                        for (var n = 0; n < record.length; n++) {
            		                            if (column.displayField && column.valueField) {
            		                                if (column.defaultValue == record[n][column.valueField]) {
            		                                	tdHtml += '<option value="' + record[n][column.valueField] + '" selected = "selected" >' + record[n][column.displayField] + '</option>';
            		                                } else {
            		                                	tdHtml += '<option value="' + record[n][column.valueField] + '" >' + record[n][column.displayField] + '</option>';
            		                                }
            		                            } else {
            		                                if (column.defaultValue == record[n]['value']) {
            		                                	tdHtml += '<option value="' + record[n]['value'] + '" selected = "selected">' + record[n]['name'] + '</option>';
            		                                } else {
            		                                	tdHtml += '<option value="' + record[n]['value'] + '" >' + record[n]['name'] + '</option>';
            		                                }
            		                            }
            		                        }
            		                    }
            		                }
            		            });
            		        }
            				tdHtml+='</select></td>';
            			}
            		}else{
            			tdHtml += '<td class="cel">' + row[column["dataIndex"]] + '</td>';
            		}
        		}
        		
        	}
        
        	tdHtml += '</tr>';
        }
	    $(".table-more tbody").append(tdHtml);
	    initPlugin(column)
	}
	HYCarFinance.grid = carGrid;
})($);