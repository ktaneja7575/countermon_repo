	var cloud_names=["beta","zs1","zs2","zs3","zsnet","zsc"];
	var day_array=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var month_array=["January","February","March","April","May","June","July","August","September","October","November","December"];
	var month_date_limit=["31","28","31","30","31","30","31","31","30","31","30","31"];
	var list_of_counters=["http_tot_request_header_bytes_received","http_tot_request_received","http_tot_transaction_complete","http_tot_request_bytes_received","http_tot_all_responses","http_tot_Gets","http_tot_request_header_partial_chunks","http_tot_Connects"];
	var current_cloud_for_second_page,start_range,end_range;
// this set is for first calender
        var today=new Date();
        var dd=today.getDate();
        var mm=today.getMonth()+1;
        var yy=today.getFullYear();
        var day = new Date(today.getFullYear(), today.getMonth(), 1);
        var first_day=day_array[day.getDay()];
        var last_date_of_month=month_date_limit[mm-1];

// this set is for second calender
	var today2=new Date();
        var dd2=today2.getDate();
        var mm2=today2.getMonth()+1;
        var yy2=today2.getFullYear();
        var day2 = new Date(today2.getFullYear(), today2.getMonth(), 1);
        var first_day2=day_array[day2.getDay()];
        var last_date_of_month2=month_date_limit[mm2-1];

function create_buttons_cloud_wise(master_div_element)
{
	for(var cloud_indexer=0;cloud_indexer<cloud_names.length;cloud_indexer++)
	{
		var button_object=document.createElement("button");
		button_object.innerHTML=cloud_names[cloud_indexer];
		button_object.setAttribute("id",cloud_names[cloud_indexer]);
		button_object.setAttribute("class","button button--wayra button--border-thick button--text-upper button--size-s");
		master_div_element.appendChild(button_object);
	}
}
function beta_button_clicked()
{
	current_cloud_for_second_page="beta";
	window.location.href="cloud_filter.html";
}
function zs1_button_clicked()
{
	current_cloud_for_second_page="zs1";
	window.location.href="cloud_filter.html";
}
function zs2_button_clicked()
{
	current_cloud_for_second_page="zs2";
	window.location.href="cloud_filter.html";
}
function zs3_button_clicked()
{
	current_cloud_for_second_page="zs3";
	window.location.href="cloud_filter.html";
}
function zsc_button_clicked()
{
	current_cloud_for_second_page="zsc";
	window.location.href="cloud_filter.html";
}
function zsnet_button_clicked()
{
	current_cloud_for_second_page="zsnet";
	window.location.href="cloud_filter.html";
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
function create_master_table_for_passed_cloud(current_cloud,master_div_element,file_name,input_tag_text,final_counter_array)
{
	fetch(file_name)
		.then(function(resp){
			return resp.json();
		})
		.then(function(data){
			traverse_gathered_data(data,current_cloud,master_div_element,input_tag_text,final_counter_array);	
		});
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
function traverse_gathered_data(data,current_cloud,master_div_element,input_tag_text,final_counter_array)
{
	//creating heading of table
	var indexer,td_tag;
	var array_for_instances=new Array();
	var array_for_counters=new Array();
	var threshold_of_counters=new Array();
	var time_interval_of_counters=new Array();
	array_for_instances=get_instances_return_array(data,input_tag_text);
	array_for_counters=final_counter_array;
	threshold_of_counters=get_threshold_return_array(array_for_counters,data[0]);
	time_interval_of_couneters=get_time_interval_return_array(array_for_counters,data[0]);
	var table_element=document.createElement("TABLE");
	table_element.setAttribute("style","border: 1px solid black;border-collapse: collapse;");
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
		var string_generator=array_for_counters[indexer]+"[Time_Interval :- "+time_interval_of_couneters[indexer]+"] [Threshold_Value :- "+threshold_of_counters[indexer]+"]";
		text=document.createTextNode(string_generator);
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
			var temp_array=new Array();
			temp_array=object_getter[array_for_counters[indexer2]].split("-");
			text=document.createTextNode(temp_array[0]);
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
function master_function_display_data_second_page(for_date,input_tag_text,final_counter_array)
{
	var display_data_for_cloud=JSON.parse(localStorage.getItem('cloud_name'));
	var master_div_element=document.getElementById("div_to_display_searched_contents");
	var temp_div=document.createElement("div");
	var cloud_template=document.createElement("h2");
	var cloud_template_text=document.createTextNode("Displaying stats for:- "+display_data_for_cloud+" "+for_date);
	cloud_template.setAttribute("align","center");
	cloud_template.setAttribute("class","border_to_heading");
	cloud_template.appendChild(cloud_template_text);
	temp_div.appendChild(cloud_template);
	var file_name="./counter_mon_logs/"+display_data_for_cloud+"/countermon_json_file_"+for_date+"_cloud_"+display_data_for_cloud+".json";
	create_master_table_for_passed_cloud(display_data_for_cloud,temp_div,file_name,input_tag_text,final_counter_array);
	master_div_element.appendChild(temp_div);

}
function empty_calender(which)
{
	if(which == "start_range")
	{
		for(var indexer=1;indexer<=42;indexer++)
		{
			document.getElementById(indexer+"s").innerHTML="";
		}
	}
	else if(which == "end_range")
        {
                for(var indexer=1;indexer<=42;indexer++)
                {
                        document.getElementById(indexer+"e").innerHTML="";
                }
        }

}
function get_day_from_current_data(operation)
{
	var remaining_days,get_current_index,diff;
	if(operation == "backward")
	{
		remaining_days=last_date_of_month % 7;
		get_current_index=day_array.indexOf(first_day);
		var current_index;
		if(get_current_index < remaining_days)
		{
			diff=remaining_days-get_current_index;
			diff--;
			diff=6-diff;
			current_index=diff;
		}
		else
		{
			current_index=get_current_index-remaining_days;
		}
	
		return day_array[current_index];
	}
	if(operation == "forward")
	{
		remaining_days=last_date_of_month % 7;
		get_current_index=day_array.indexOf(first_day);
		var adder=remaining_days+get_current_index;
		if(adder>6)
		{
			diff=adder-6;
			return day_array[diff-1];
		}
		else
		{
			return day_array[adder];
		}
	}
        if(operation == "backward_end")
        {
                remaining_days=last_date_of_month2 % 7;
                get_current_index=day_array.indexOf(first_day2);
                var current_index;
                if(get_current_index < remaining_days)
		{
			diff=remaining_days-get_current_index;
                        diff--;
                        diff=6-diff;
                        current_index=diff;
                }
                else
                {
                        current_index=get_current_index-remaining_days;
                }

                return day_array[current_index];
        }
        if(operation == "forward_end")
        {
                remaining_days=last_date_of_month2 % 7;
                get_current_index=day_array.indexOf(first_day2);
                var adder=remaining_days+get_current_index;
                if(adder>6)
                {
                        diff=adder-6;
                        return day_array[diff-1];
                }
                else
                {
                        return day_array[adder];
                }
        }

}
function move_calender(where)
{
	if(where == "start_range_month_back")
	{
			empty_calender("start_range");
			mm--;
			if(mm==0)
			{
				mm=12;
				yy--;
			}
			last_date_of_month=month_date_limit[mm-1];
		        if(yy % 4 == 0 && mm == 2)
        		{
                		last_date_of_month=29;
        		}
			first_day=get_day_from_current_data("backward");
        		get_current_details_and_rule_calender_start(yy,mm,first_day,last_date_of_month);
	}
	if(where == "start_range_month_forward")
        {
		
                        empty_calender("start_range");
			first_day=get_day_from_current_data("forward");
                        mm++;
                        if(mm==13)
                        {
                                mm=1;
                                yy++;
                        }
                        last_date_of_month=month_date_limit[mm-1];
                        if(yy % 4 == 0 && mm == 2)
                        {
                                last_date_of_month=29;
                        }
                        get_current_details_and_rule_calender_start(yy,mm,first_day,last_date_of_month);
        }
	if(where == "end_range_month_back")
	{
                        empty_calender("end_range");
                        mm2--;
                        if(mm2==0)
                        {
                                mm2=12;
                                yy2--;
                        }
                        last_date_of_month=month_date_limit[mm2-1];
                        if(yy2 % 4 == 0 && mm2 == 2)
                        {
                                last_date_of_month2=29;
                        }
                        first_day2=get_day_from_current_data("backward_end");
                        get_current_details_and_rule_calender_end(yy2,mm2,first_day2,last_date_of_month2);
        }
        if(where == "end_range_month_forward")
        {

                        empty_calender("end_range");
                        first_day2=get_day_from_current_data("forward_end");
                        mm2++;
                        if(mm2==13)
                        {
                                mm2=1;
                                yy2++;
                        }
                        last_date_of_month2=month_date_limit[mm2-1];
                        if(yy2 % 4 == 0 && mm2 == 2)
                        {
                                last_date_of_month2=29;
                        }
                        get_current_details_and_rule_calender_end(yy2,mm2,first_day2,last_date_of_month2);
        }

}
function create_table_with_default_ids_start_range()
{
	var get_main_div=document.getElementById("division_for_calender_start");
        var main_table_element=document.createElement("table");
	main_table_element.setAttribute("align","left");
	var tr_tag=document.createElement("tr");
        var th_tag=document.createElement("th");
	var th_tag2=document.createElement("th");
	th_tag2.setAttribute("colspan","2");
	var text=document.createTextNode("From:- ");
	th_tag2.appendChild(text);
	tr_tag.appendChild(th_tag2);
	th_tag.setAttribute("colspan","5");
	var td_tag;
	th_tag.setAttribute("id","year_start");
	th_tag.setAttribute("style","text-align:center;");
        tr_tag.appendChild(th_tag);
	tr_tag.appendChild(th_tag);
        main_table_element.appendChild(tr_tag);
	tr_tag=document.createElement("tr");
	th_tag=document.createElement("th");
	th_tag.setAttribute("id","start_range_month_back");
	th_tag.setAttribute("onclick","move_calender('start_range_month_back')");
	text=document.createTextNode("<");
        th_tag.appendChild(text);
	tr_tag.appendChild(th_tag);
        th_tag=document.createElement("th");
	th_tag.setAttribute("colspan","5");
	th_tag.setAttribute("id","month_start");
	th_tag.setAttribute("style","text-align:center;");
        tr_tag.appendChild(th_tag);
	th_tag=document.createElement("th");
	th_tag.setAttribute("id","start_range_month_forward");
	th_tag.setAttribute("onclick","move_calender('start_range_month_forward')");
        text=document.createTextNode(">");
        th_tag.appendChild(text);
        tr_tag.appendChild(th_tag);
        main_table_element.appendChild(tr_tag);
        tr_tag=document.createElement("tr");
        for(var day_indexer=0;day_indexer<day_array.length;day_indexer++)
        {
                td_tag=document.createElement("td");
                var temp_array=new Array();
                temp_array=day_array[day_indexer];
                data=document.createTextNode(temp_array[0]);
                td_tag.appendChild(data);
                tr_tag.appendChild(td_tag);
                main_table_element.appendChild(tr_tag);
        }
	var counter=0;
	for(var indexer=1;indexer<=6;indexer++)
	{
		tr_tag=document.createElement("tr");
		for(var indexer2=1;indexer2<=7;indexer2++)
		{
			counter++;
			td_tag=document.createElement("td");
			td_tag.setAttribute("id",counter+"s");
			tr_tag.appendChild(td_tag);
		}
		main_table_element.appendChild(tr_tag);
	}
	get_main_div.appendChild(main_table_element);
}
function create_table_with_default_ids_last_range()
{
        var get_main_div=document.getElementById("division_for_calender_end");
        var main_table_element=document.createElement("table");
        main_table_element.setAttribute("align","left");
	var tr_tag=document.createElement("tr");
        th_tag=document.createElement("th");
	var th_tag2=document.createElement("th");
        th_tag2.setAttribute("colspan","2");
        var text=document.createTextNode("To:- ");
        th_tag2.appendChild(text);
        tr_tag.appendChild(th_tag2);
        th_tag.setAttribute("colspan","7");
        var td_tag;
        th_tag.setAttribute("id","year_end");
        th_tag.setAttribute("style","text-align:center;");
        tr_tag.appendChild(th_tag);
        main_table_element.appendChild(tr_tag);
	tr_tag=document.createElement("tr");
        th_tag=document.createElement("th");
	th_tag.setAttribute("id","end_range_month_back");
	th_tag.setAttribute("onclick","move_calender('end_range_month_back')");
        text=document.createTextNode("<");
        th_tag.appendChild(text);
        tr_tag.appendChild(th_tag);
        th_tag=document.createElement("th");
        th_tag.setAttribute("colspan","5");
        th_tag.setAttribute("id","month_end");
        th_tag.setAttribute("style","text-align:center;");
        tr_tag.appendChild(th_tag);
	th_tag=document.createElement("th");
	th_tag.setAttribute("id","end_range_month_forward");
	th_tag.setAttribute("onclick","move_calender('end_range_month_forward')");
        text=document.createTextNode(">");
        th_tag.appendChild(text);
        tr_tag.appendChild(th_tag);
        main_table_element.appendChild(tr_tag);
        tr_tag=document.createElement("tr");
        for(var day_indexer=0;day_indexer<day_array.length;day_indexer++)
        {
                td_tag=document.createElement("td");
                var temp_array=new Array();
                temp_array=day_array[day_indexer];
                data=document.createTextNode(temp_array[0]);
                td_tag.appendChild(data);
                tr_tag.appendChild(td_tag);
                main_table_element.appendChild(tr_tag);
        }
        var counter=0;
        for(var indexer=1;indexer<=6;indexer++)
        {
                tr_tag=document.createElement("tr");
                for(var indexer2=1;indexer2<=7;indexer2++)
                {
                        counter++;
                        td_tag=document.createElement("td");
                        td_tag.setAttribute("id",counter+"e");
                        tr_tag.appendChild(td_tag);
                }
                main_table_element.appendChild(tr_tag);
        }
        get_main_div.appendChild(main_table_element);
}
function picked_value(element,which_table)
{
	if( ! element.innerHTML)
	{
		return 0;
	}
	if(which_table == "start_table")
	{
		start_range=element.innerHTML;
		element.setAttribute("style","border:3px solid black;");
	}
	else if(which_table == "end_table")
	{
		end_range=element.innerHTML;
		element.setAttribute("style","border:3px solid black;");
	}
}

function get_current_details_and_rule_calender_start(year,month,start_day,last_date)
{
	var index_of_week=day_array.indexOf(start_day);
	var total_indexing=35;
	var front_left_over=index_of_week;
	front_left_over+=1;
	var add=index_of_week+parseInt(last_date);
	var counter=0;
	for(var indexer=front_left_over;indexer<=add;indexer++)
	{
		counter++;
		var element_fetcher=document.getElementById(indexer+"s").innerHTML=counter;
		element_fetcher=document.getElementById(indexer+"s");
		element_fetcher.setAttribute("onclick","picked_value(this,'start_table')");

	}
	document.getElementById("year_start").innerHTML=year;
	document.getElementById("month_start").innerHTML=month_array[month-1];
}
function get_current_details_and_rule_calender_end(year2,month2,start_day2,last_date2)
{
        var index_of_week=day_array.indexOf(start_day2);
        var total_indexing=35;
        var front_left_over=index_of_week;
        front_left_over+=1;
        var add=index_of_week+parseInt(last_date2);
        var counter=0;
        for(var indexer=front_left_over;indexer<=add;indexer++)
        {
                counter++;
                var element_fetcher=document.getElementById(indexer+"e").innerHTML=counter;
		element_fetcher=document.getElementById(indexer+"e");
		element_fetcher.setAttribute("onclick","picked_value(this,'end_table')");

        }
        document.getElementById("year_end").innerHTML=year2;
        document.getElementById("month_end").innerHTML=month_array[month2-1];
}
function display_data_for_specific_range()
{
	var final_counter_array=new Array();
	var flagger=0;
	for(var index=0;index<list_of_counters.length;index++)
	{
		var element=document.getElementById(list_of_counters[index]);
		if(element.checked)
		{
			flagger=1;
			final_counter_array.push(list_of_counters[index]);	
		}
	}
	if(flagger == 0)
	{
		final_counter_array=list_of_counters;
	}
	if(document.getElementById("div_to_display_searched_contents").innerHTML)
	{
		document.getElementById("div_to_display_searched_contents").innerHTML="";
	}
	if( (!start_range) || (!end_range))
	{
		return 0;
	}
	var input_tag_text=document.getElementById("input_instnaces").value;
	var start_month_date_limit=month_date_limit[mm-1];
 	var date_indexer,counter=0,final_date;
	if(mm == mm2)
	{
		start_month_date_limit=end_range;
	}
	for(date_indexer=start_range;date_indexer<=start_month_date_limit;date_indexer++)
	{
		counter++;
		if(counter > 30)
		{
			alert("Error : This tool is limited for 30 days only.");
                	return 0;
		}
		var temp=date_indexer;
		var temp2=mm;
		if(temp < 10)
		{
			temp="0"+temp;
		}
		if(temp2 < 10)
		{
			temp2="0"+temp2;
		}
		var year=yy.toString();
		year=year.substring(year.length-2);
		final_date=temp+"-"+temp2+"-"+year;
		master_function_display_data_second_page(final_date,input_tag_text,final_counter_array);
	}
	if(counter >= 30 && (mm != mm2 || yy != yy2))
	{
		alert("Error : This tool is limited for 30 days only.");
		return 0;
	}
	if(mm != mm2)
	{
	for(date_indexer=1;date_indexer<=end_range;date_indexer++)
	{
		counter++;
		if(counter > 30)
		{
			alert("Error : This tool is limited for 30 days only.");
			return 0;
		}
		var temp=date_indexer;
		var temp2=mm2;
                if(temp < 10)
                {
                        temp="0"+temp;
                }
		if(temp2 < 10)
                {
                        temp2="0"+temp2;
                }
		var year=yy2.toString();
                year=year.substring(year.length-2);
		final_date=temp+"-"+temp2+"-"+year;
		master_function_display_data_second_page(final_date,input_tag_text,final_counter_array);
	}
	}

}
function master_function_display_calender()
{
	create_table_with_default_ids_start_range();
	create_table_with_default_ids_last_range();
	if(yy % 4 == 0 && mm == 2)
	{
		last_date_of_month=29;
	}
	if(yy2 % 4 == 0 && mm2 == 2)
        {
                last_date_of_month2=29;
        }
	get_current_details_and_rule_calender_start(yy,mm,first_day,last_date_of_month);
	get_current_details_and_rule_calender_end(yy2,mm2,first_day2,last_date_of_month2);
	var selector_div=document.getElementById("selector_div");
	var input_element=document.createElement("input");
	input_element.setAttribute("type","text");
	input_element.setAttribute("id","input_instnaces");
	input_element.setAttribute("placeholder","  Enter instance regex.");
	input_element.setAttribute("style","height:30px;width:200px;position:relative;top:80px;");
	selector_div.appendChild(input_element);

	var div=document.createElement("div");
	div.setAttribute("style","position:relative;top:80px;left:10px;height:30px;width:200px;")
	div.setAttribute("class","dropdown");
	var button=document.createElement("button");
	button.setAttribute("style","height:30px;width:330px;background-color:#3498db;color:white;");
	var text=document.createTextNode("SELECT COUNTERS");
	button.appendChild(text);
	div.appendChild(button);
	var div2=document.createElement("div");
	div2.setAttribute("class","dropdown-content");
	for(var indexer=0;indexer<list_of_counters.length;indexer++)
	{
		var div_for_checkbox=document.createElement("div");
		var input=document.createElement("input");
		input.setAttribute("type","checkbox");
		input.setAttribute("id",list_of_counters[indexer]);
		var p_tag=document.createElement("label");
		var text=document.createTextNode(list_of_counters[indexer]);
		p_tag.appendChild(text);
		div_for_checkbox.appendChild(input);
		div_for_checkbox.appendChild(p_tag);
		div2.appendChild(div_for_checkbox);
	}
	div.appendChild(div2);
	selector_div.appendChild(div);
	button=document.createElement("button");
	button.setAttribute("onclick","display_data_for_specific_range()")
	button.setAttribute("class","button button2");
	var text_node=document.createTextNode("PROCEED");
	button.appendChild(text_node);
	selector_div.appendChild(button);
}
