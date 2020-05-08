var cloud_names=["beta","zs1","zs2","zs3","zsnet","zsc"];
var current_cloud_for_second_page;
function create_buttons_cloud_wise(master_div_element)
{
	for(var cloud_indexer=0;cloud_indexer<cloud_names.length;cloud_indexer++)
	{
		var button_object=document.createElement("button");
		button_object.innerHTML=cloud_names[cloud_indexer];
		button_object.setAttribute("id",cloud_names[cloud_indexer]);
		button_object.setAttribute("style","height:100px;width:100px;background-color: #e7e7e7; color: black;font-size: 16px;border-radius: 8px;padding:20px;margin-right: 50px;");
		master_div_element.appendChild(button_object);
	}
}
function beta_button_clicked()
{
	current_cloud_for_second_page="beta";
	window.location.href="cloud_table.html";
}
function zs1_button_clicked()
{
	current_cloud_for_second_page="zs1";
	window.location.href="cloud_table.html";
}
function zs2_button_clicked()
{
	current_cloud_for_second_page="zs2";
	window.location.href="cloud_table.html";
}
function zs3_button_clicked()
{
	current_cloud_for_second_page="zs3";
	window.location.href="cloud_table.html";
}
function zsc_button_clicked()
{
	current_cloud_for_second_page="zsc";
	window.location.href="cloud_table.html";
}
function zsnet_button_clicked()
{
	current_cloud_for_second_page="zsnet";
	window.location.href="cloud_table.html";
}
function set_event_listners_to_buttons()
{
	var object_getter;
	for(var indexer=0;indexer<cloud_names.length;indexer++)
	{
		if(cloud_names[indexer] == "beta")
		{
			object_getter=document.getElementById("beta");
			object_getter.setAttribute("onclick","beta_button_clicked()");
		}
		else if(cloud_names[indexer] == "zs1")
                {
                        object_getter=document.getElementById("zs1");
                        object_getter.setAttribute("onclick","zs1_button_clicked()");
                }
		else if(cloud_names[indexer] == "zs3")
                {
                        object_getter=document.getElementById("zs3");
                        object_getter.setAttribute("onclick","zs3_button_clicked()");
                }
		else if(cloud_names[indexer] == "zs2")
                {
                        object_getter=document.getElementById("zs2");
                        object_getter.setAttribute("onclick","zs2_button_clicked()");
                }
		else if(cloud_names[indexer] == "zsc")
                {
                        object_getter=document.getElementById("zsc");
                        object_getter.setAttribute("onclick","zsc_button_clicked()");
                }
		else if(cloud_names[indexer] == "zsnet")
                {
                        object_getter=document.getElementById("zsnet");
                        object_getter.setAttribute("onclick","zsnet_button_clicked()");
                }

	}
}
function create_main_div_tag()
{
	var master_div_element=document.createElement('div');
	master_div_element.setAttribute("align","center");
	document.body.appendChild(master_div_element);
	create_buttons_cloud_wise(master_div_element);
	set_event_listners_to_buttons();
}
function create_master_table_for_passed_cloud(current_cloud,master_div_element)
{
	var file_name_generator="./countermon_json_file_cloud_"+current_cloud+".json";
	fetch(file_name_generator)
		.then(function(resp){
			return resp.json();
		})
		.then(function(data){
			traverse_gathered_data(data,current_cloud,master_div_element);	
		});
}
function get_instances_return_array(data)
{
	var temp_array=new Array();
	for(var indexer=0;indexer<data.length;indexer++)
	{
		temp_array.push(data[indexer].instance_name);
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
function traverse_gathered_data(data,current_cloud,master_div_element)
{
	
	//creating heading of table
	var indexer,td_tag;
	var array_for_instances=new Array();
	var array_for_counters=new Array();
	var threshold_of_counters=new Array();
	var time_interval_of_counters=new Array();
	array_for_instances=get_instances_return_array(data);
	array_for_counters=get_counters_return_array(data);
	threshold_of_counters=get_threshold_return_array();
	time_interval_of_couneters=get_time_interval_return_array();
	var table_element=document.createElement("TABLE");
	table_element.setAttribute("style","border: 1px solid black;border-collapse: collapse;width: 100%;height: 100%;");
	var table_row1=document.createElement("tr");
	table_row1.setAttribute("style","border: 1px solid black;border-collapse: collapse;");
	var table_heading=document.createElement("th");
	table_heading.setAttribute("style","border: 1px solid black;border-collapse: collapse;text-align: center;");
	var text=document.createTextNode("INSTANCE NAME");
	table_heading.appendChild(text);
	table_row1.appendChild(table_heading);
	for(indexer=0;indexer<array_for_counters.length;indexer++)
	{
		table_heading=document.createElement("th");
		table_heading.setAttribute("style","border: 1px solid black;border-collapse: collapse;text-align: center;");
		text=document.createTextNode(array_for_counters[indexer]);
		table_heading.appendChild(text);
		table_row1.appendChild(table_heading);
		table_row1.setAttribute("style","border: 1px solid black;border-collapse: collapse;");
	}
	table_element.appendChild(table_row1);
	//table heading created..
	
	for(indexer=0;indexer<array_for_instances.length;indexer++)
	{
		var object_getter=get_object_corresponding_to_instance(data,array_for_instances[indexer]);
		table_row1=document.createElement("tr");
		table_row1.setAttribute("style","border: 1px solid black;border-collapse: collapse;");
		td_tag=document.createElement("td");
		td_tag.setAttribute("style","border: 1px solid black;border-collapse: collapse;text-align: center;");
		text=document.createTextNode(array_for_instances[indexer]);
		td_tag.appendChild(text);
		table_row1.appendChild(td_tag);
		var value_sum=0;
		for(var indexer2=0;indexer2<array_for_counters.length;indexer2++)
		{
			value_sum=value_sum+parseInt(object_getter[array_for_counters[indexer2]]);
			td_tag=document.createElement("td");
			td_tag.setAttribute("style","border: 1px solid black;border-collapse: collapse;text-align: center;");
			text=document.createTextNode(object_getter[array_for_counters[indexer2]]);
			td_tag.appendChild(text);
			table_row1.appendChild(td_tag);
		}
		if(value_sum!=0)
		{
			table_element.appendChild(table_row1);
		}
	}

        master_div_element.appendChild(table_element);
}
function set_value_to_local_storage()
{

	localStorage.setItem('cloud_name', JSON.stringify(current_cloud_for_second_page));
}
function master_function_display_data_second_page()
{
	var display_data_for_cloud=JSON.parse(localStorage.getItem('cloud_name'));
	var master_div_element=document.getElementById("master_table_id");
	var cloud_template=document.createElement("h2");
	var cloud_template_text=document.createTextNode("Displaying stats for:- "+display_data_for_cloud);
	cloud_template.appendChild(cloud_template_text);
	master_div_element.appendChild(cloud_template);

	create_master_table_for_passed_cloud(display_data_for_cloud,master_div_element);
}
