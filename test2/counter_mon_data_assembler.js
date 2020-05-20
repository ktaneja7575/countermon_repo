var hash1 = {};
function makeTable( master_div_element) {
	console.log(hash1);
    var table = document.createElement('table');
    for (var i = 0; i < 5; i++) {
        var row = document.createElement('tr');
        for (var j = 0; j < 5; j++) {
            var cell = document.createElement('td');
            cell.textContent = "qwert";
            row.appendChild(cell);
        }
        table.appendChild(row);
	}
	console.log(hash1);
	master_div_element.appendChild(table);
}
function createTable(tableData) {
	var table = document.createElement('table');
	var tableBody = document.createElement('tbody');
  
	tableData.forEach(function(rowData) {
	  var row = document.createElement('tr');
  
	  rowData.forEach(function(cellData) {
		var cell = document.createElement('td');
		cell.appendChild(document.createTextNode(cellData));
		row.appendChild(cell);
	  });
  
	  tableBody.appendChild(row);
	});
  
	table.appendChild(tableBody);
	document.body.appendChild(table);
  }
function find_date(origi_date)
{
    var z = String(origi_date);
    // var month, day, year;
    // if(z[1] == "/")
    // {
    //     month = "0"+z[0];
    //     if(z[3] == "/")
    //     {
    //         day = "0"+z[2];
    //         year = z[6]+z[7];
    //     }
    //     else
    //     {
    //         day = z[2]+z[3];
    //         year = z[7]+z[8];
    //     }
    // }
    // else
    // {
    //     month = z[0]+z[1];
    //     if(z[4] == "/")
    //     {
    //         day = "0"+z[3];
    //         year = z[7]+z[8];
    //     }
    //     else{
    //         day = z[3]+z[4];
    //         year = z[8]+z[9];
    //     }
	// }
	// day = z[0]+z[1];
	// month = z[3]+z[4];
	// year = z[8]+z[9];
    var final_date = z[0]+z[1]+z[2]+z[3]+z[4]+z[5]+z[8]+z[9];
    // console.log(final_date);
    return final_date;
}
function find_time(origi_date)
{
    var z = String(origi_date);
    var final_time = z[11]+z[12]+z[13]+z[14]+z[15]+z[16]+z[17]+z[18];
    return final_time;
}


function get_instances_return_array(data,input_tag_text)
{
	var temp_array=new Array();
	for(var indexer=0;indexer<data.length;indexer++)
	{
		if(data[indexer].instance_name.match(input_tag_text))
		{
			temp_array.push(data[indexer].instance_name);
		}
	}
	return temp_array;
}
function get_counters_return_array(data)
{
	var temp_array=new Array();
	var object_getter=data[0];
	for (var key in object_getter)
        {
		if( key != "instance_name")
		{
			temp_array.push(key);
		}
        }
	return temp_array;
}
function get_object_corresponding_to_instance(data,instance)
{
	for(var indexer=0;indexer<data.length;indexer++)
	{
		if(data[indexer].instance_name == instance)
		{
			return data[indexer];
		}
	}
}
function get_threshold_return_array(array_of_counters,object_getter)
{
	var array_to_return=new Array();
	for(var indexer=0;indexer<array_of_counters.length;indexer++)
	{
		var temp_array=new Array();
		temp_array=object_getter[array_of_counters[indexer]].split("-");
		array_to_return[indexer]=temp_array[1];
	}
	return array_to_return;
}
function get_time_interval_return_array(array_of_counters,object_getter)
{
	var array_to_return=new Array();
        for(var indexer=0;indexer<array_of_counters.length;indexer++)
        {       
                var temp_array=new Array();
                temp_array=object_getter[array_of_counters[indexer]].split("-");
                array_to_return[indexer]=temp_array[2];
        }
        return array_to_return;
}




// function traverse_gathered_data(data,current_cloud,master_div_element,input_tag_text,final_counter_array)
// {
// 	//creating heading of table
// 	var indexer,td_tag;
// 	var array_for_instances=new Array();
// 	var array_for_counters=new Array();
// 	var threshold_of_counters=new Array();
// 	var time_interval_of_counters=new Array();
// 	array_for_instances=get_instances_return_array(data,input_tag_text);
// 	array_for_counters=final_counter_array;
// 	threshold_of_counters=get_threshold_return_array(array_for_counters,data[0]);
// 	time_interval_of_couneters=get_time_interval_return_array(array_for_counters,data[0]);
// 	var table_element=document.createElement("TABLE");
// 	table_element.setAttribute("style","border: 1px solid black;border-collapse: collapse;");
// 	var table_row1=document.createElement("tr");
// 	table_row1.setAttribute("style","border: 1px solid black;border-collapse: collapse;");
// 	var table_heading=document.createElement("th");
// 	table_heading.setAttribute("style","border: 1px solid black;border-collapse: collapse;text-align: center;");
// 	var text=document.createTextNode("INSTANCE NAME");
// 	table_heading.appendChild(text);
// 	table_row1.appendChild(table_heading);
// 	for(indexer=0;indexer<array_for_counters.length;indexer++)
// 	{
// 		table_heading=document.createElement("th");
// 		table_heading.setAttribute("style","border: 1px solid black;border-collapse: collapse;text-align: center;");
// 		var string_generator=array_for_counters[indexer]+"[Time_Interval :- "+time_interval_of_couneters[indexer]+"] [Threshold_Value :- "+threshold_of_counters[indexer]+"]";
// 		text=document.createTextNode(string_generator);
// 		table_heading.appendChild(text);
// 		table_row1.appendChild(table_heading);
// 		table_row1.setAttribute("style","border: 1px solid black;border-collapse: collapse;");
// 	}
// 	table_element.appendChild(table_row1);
// 	//table heading created..
	
// 	for(indexer=0;indexer<array_for_instances.length;indexer++)
// 	{
// 		var object_getter=get_object_corresponding_to_instance(data,array_for_instances[indexer]);
// 		table_row1=document.createElement("tr");
// 		table_row1.setAttribute("style","border: 1px solid black;border-collapse: collapse;");
// 		td_tag=document.createElement("td");
// 		td_tag.setAttribute("style","border: 1px solid black;border-collapse: collapse;text-align: center;");
// 		text=document.createTextNode(array_for_instances[indexer]);
// 		td_tag.appendChild(text);
// 		table_row1.appendChild(td_tag);
// 		var value_sum=0;
// 		for(var indexer2=0;indexer2<array_for_counters.length;indexer2++)
// 		{
// 			value_sum=value_sum+parseInt(object_getter[array_for_counters[indexer2]]);
// 			td_tag=document.createElement("td");
// 			td_tag.setAttribute("style","border: 1px solid black;border-collapse: collapse;text-align: center;");
// 			var temp_array=new Array();
// 			temp_array=object_getter[array_for_counters[indexer2]].split("-");
// 			text=document.createTextNode(temp_array[0]);
// 			td_tag.appendChild(text);
// 			table_row1.appendChild(td_tag);
// 		}
// 		if(value_sum!=0)
// 		{
// 			table_element.appendChild(table_row1);
// 		}
// 	}

//         master_div_element.appendChild(table_element);
// }
function traverse_gathered_data2(data,current_cloud,master_div_element,input_tag_text,final_counter_array,t1,t2)
{
	var array_for_instances=new Array();
	array_for_instances=get_instances_return_array(data,input_tag_text);
	console.log(array_for_instances);
	// var inst = new Array();
		for(var indexer=0; indexer<array_for_instances.length; indexer++)
		{
			// var count = new Array(final_counter_array.length);
			// var object_getter = get_object_corresponding_to_instance(data,array_for_instances[indexer]);
			// for(var index=0; index<final_counter_array.length; index++)
			// {
			// 	var len = final_counter_array.length;
			//     var time_value = final_counter_array[index]+"_time_values";
			//     console.log(object_getter[final_counter_array[index]][time_value][0]);
			// }

			var object_getter = get_object_corresponding_to_instance(data,array_for_instances[indexer]);
			if(array_for_instances[indexer] in hash1)
			{
				console.log("alread exist instance");;
			}
			else{
				hash1[array_for_instances[indexer]] = {};
			}
			
        if("NO_DATA_FOUND" in object_getter)
        {
			console.log("no data");
			// count.fill(0);
        }
        else{
			
            for(var k=0; k<final_counter_array.length; k++){
                var time_value = final_counter_array[k]+"_time_values";
				var inst_count_time_val =0;
				var len = object_getter[final_counter_array[k]][time_value].length;
				console.log(len);
                for(var c=0; c<len; c=c+2){
					// console.log(object_getter[final_counter_array[k]][time_value][c]);

                    if(object_getter[final_counter_array[k]][time_value][c]>=t1 && object_getter[final_counter_array[k]][time_value][c]<=t2)
                    {
                        inst_count_time_val++;
                    }
				}
				console.log(array_for_instances[indexer], final_counter_array[k], inst_count_time_val, t1,t2);
				// count[k]=inst_count_time_val;
				if(hash1[array_for_instances[indexer]][final_counter_array[k]] in hash1)
				{
					hash1[array_for_instances[indexer]][final_counter_array[k]] = hash1[array_for_instances[indexer]][final_counter_array[k]] + inst_count_time_val;
				}
				else{
					hash1[array_for_instances[indexer]][final_counter_array[k]] = inst_count_time_val;
				}
			}
			
        }
		// inst.push(count);
		}
		// console.log(inst[0],inst[1],inst[2]);
		console.log(Object.keys(hash1)[0], Object.values(hash1)[0], Object.keys(hash1).length );
		console.log(hash1);
		var table_element=document.createElement("TABLE");
		table_element.setAttribute("style","border: 1px solid black; border-collapse: collapse; margin-left:auto;margin-right:auto; padding:50px;");
		var table_row1=document.createElement("tr");
	table_row1.setAttribute("style","border: 1px solid black;border-collapse: collapse;  padding:15px; background-color:rgb(175, 200, 247)");
	var table_heading=document.createElement("th");
	table_heading.setAttribute("style","border: 1px solid black;border-collapse: collapse;text-align: center;  padding:15px; ");
	var text=document.createTextNode("INSTANCE NAME");
	table_heading.appendChild(text);
	table_row1.appendChild(table_heading);
	table_element.appendChild(table_row1);
	for(var p=0; p<final_counter_array.length; p++)
	{
		table_heading=document.createElement("th");
		table_heading.setAttribute("style","border: 1px solid black;border-collapse: collapse;text-align: center;  padding:15px");
		text=document.createTextNode(final_counter_array[p]);
		table_heading.appendChild(text);
		table_row1.appendChild(table_heading);
		table_element.appendChild(table_row1);
	}
		
		
		
		
		
		for(var i=0; i<Object.keys(hash1).length; i++)
		{
			// document.write(Object.keys(hash1)[i]);
			var x = Object.values(hash1)[i];
			table_row1=document.createElement("tr");
			table_row1.setAttribute("style","border: 1px solid black;border-collapse: collapse; padding:15px");
			var table_data=document.createElement("td");
			// table_data.classList.add("mystyle");
	        table_data.setAttribute("style","border: 1px solid black;border-collapse: collapse; padding:15px");
			text=document.createTextNode(Object.keys(hash1)[i]);
			table_data.appendChild(text);
			table_row1.appendChild(table_data);
			// table_element.appendChild(table_row1);
			for(var p=0; p<final_counter_array.length; p++)
	        {
			table_data=document.createElement("td");
			// table_data.classList.add("mystyle");
	        table_data.setAttribute("style","border: 1px solid black;border-collapse: collapse; text-align:center;");
			text=document.createTextNode(x[final_counter_array[p]]);
			table_data.appendChild(text);
			table_row1.appendChild(table_data);
			
				// document.write(x[final_counter_array[p]]);

	        }
			// document.write(Object.keys(x).length);
			// var len1 = Object.keys(x).length;
			// for(var j=0; j< len1; j++)
			// {
			// 	document.write(Object.keys(x)[j]);
			// document.write(Object.values(x)[j]);
			// }
			table_element.appendChild(table_row1);
			
		}
		document.getElementById("div_to_display_searched_contents").appendChild(table_element);
		
			
				// document.getElementById("demo").innerHTML = index[final_counter_array[0]][thres][0];
			
}


function create_master_table_for_passed_cloud(current_cloud,master_div_element,file_name,input_tag_text,final_counter_array,t1,t2)
{
	
	fetch(file_name)
		.then(function(resp){
			return resp.json();
		})
		.then(function(data){
			traverse_gathered_data2(data,current_cloud,master_div_element,input_tag_text,final_counter_array,t1,t2);	
		});
		
}




function master_function_display_data_second_page(cloud,for_date,input_tag_text,final_counter_array, t1, t2)
{
	var display_data_for_cloud=cloud;
	var master_div_element=document.getElementById("div_to_display_searched_contents");
	var temp_div=document.createElement("div");
	var cloud_template=document.createElement("h2");
	// var cloud_template_text=document.createTextNode("Displaying stats for:- "+display_data_for_cloud+" "+for_date);
	var cloud_template_text=document.createTextNode("Countermon Summary");
	cloud_template.setAttribute("align","center");
	cloud_template.setAttribute("class","border_to_heading");
	cloud_template.appendChild(cloud_template_text);
	temp_div.appendChild(cloud_template);
	// var file_name="./counter_mon_logs/"+"countermon_json_file_"+for_date+"_cloud_"+display_data_for_cloud+".json";
	var file_name="./counter_mon_logs/countermon_json_file_17-05-20_cloud_beta.json"
	// var myLog = new File(file_name);
	// if(myLog.exists()){
	// 	// write('The file exists');
	// 	alert(file_name);
	//   }else{
	// 	// write('The file does not exist');
	// 	console.log("error");
	//   }
	// alert(file_name);
	create_master_table_for_passed_cloud(display_data_for_cloud,temp_div,file_name,input_tag_text,final_counter_array,t1,t2);
	master_div_element.appendChild(temp_div);

}

function getDateArray(start, end){
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
    }
    return arr;
}


function getvalue_func()
{
    // var cloud_name = document.querySelector('[name="cloud_name"]:checked').value;
	var cloud_name = document.getElementById('cloud_name').value;
	var origi_date1 = document.getElementById('dp1').value;
	var origi_date2 = document.getElementById('dp2').value;
    var start_date = find_date(origi_date1);
    var end_date = find_date(origi_date2);
    var start_time = find_time(document.getElementById('dp1').value);
    var end_time = find_time(document.getElementById('dp2').value);
    var regex = document.getElementById('regex_name').value;
    var counters = [];
	var x=document.getElementById("counter");
	      for (var i = 0; i < x.options.length; i++) {
	         if(x.options[i].selected ==true){
	             counters.push(x.options[i].value);
	          }
          }
    
    // var y= counters.toString();  
    // var z= String(start_date);    
		//   document.getElementById("demo").innerHTML = cloud_name+start_date+end_date+regex+y+start_time+end_time;
		var date1 = new Date(origi_date1);
		var date2 = new Date(origi_date2);
		// document.getElementById("demo").innerHTML = date.toUTCString();
		var timestamp1 = date1.getTime()/1000;
		var timestamp2 = date2.getTime()/1000;
		console.log(timestamp1);
		console.log(timestamp2);
		// var testFolder = './counter_mon_logs/beta/'+start_date;

		// if(start_date == end_date)
		// {
		// 	var files = [testfolder+"/1.json",testfolder+"/2.json",testfolder+"/3.json",testfolder+"/4.json" ]
		// 	console.log(start_date);
		// 	console.log(timestamp1);
		// 	console.log(timestamp2);
		// 	if(timestamp1>timestamp2)
		// 	{
		// 		document.getElementById("demo").innerHTML = "enter a valid range";
		// 	}
		// 	else{
		// 		document.getElementById("demo").innerHTML = "processing data";
		// 		master_function_display_data_second_page(cloud_name,start_date,regex,counters,files);
		// 	}

		// }
		// document.getElementById("demo").innerHTML = timestamp;
		// new Date().toUTCString();
    master_function_display_data_second_page(cloud_name,start_date,regex,counters, timestamp1, timestamp2);

// 	var dateArr = getDateArray(date1, date2);
// console.log(dateArr);


}
