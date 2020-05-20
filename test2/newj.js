var final_hash = {};
function gmt_date(gmt) {
    var z = String(gmt);
    var gmt_d = z[6] + z[7] + z[8] + z[9] + z[10] + z[11] + z[12] + z[13] + z[14] + z[15] + z[16];
    return gmt_d;
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
function get_gmt_array(dateArray){
    var gmtArray = [];
    for(var i=0;i<dateArray.length; i++){
        gmtArray[i] = dateArray[i].toUTCString();
    }
    return gmtArray;
}
function gmt_date_array(gmtArray){
    var gmtdateArray = [];
    for(var i=0;i<gmtArray.length;i++){
        gmtdateArray[i] = gmt_date(gmtArray[i]);
    }
    return gmtdateArray;
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
function traverse_data_for_one_file(regex, counters, data, t1, t2){
    var instances_array = new Array();
    instances_array = get_instances_return_array(data,input_tag_text);
    for(var j=0; j<instances_array.length; j++){
        var object_getter = get_object_corresponding_to_instance(data,instances_array[j]);
        if(instances_array[j] in final_hash)
			{
				console.log("alread exist instance");;
			}
			else{
				hash1[instances_array[j]] = {};
			}
        if("NO_DATA_FOUND" in object_getter)
        {
            console.log("no data found");
        }
        else{
            for(var k=0; k<counters.length; k++){
                var time_value = counters[k]+"_time_values";
                var inst_count_time_val =0;
                for(var c=0; c< object_getter[counters[k]][time_value].length; c=c+2){
                    if(object_getter[counters[k]][time_value][c]>=t1 && object_getter[counters[k]][time_value][c]<=t2)
                    {
                        inst_count_time_val++;
                    }
                }
                if(final_hash[instances_array[j]][counters[k]] in final_hash)
				{
					final_hash[instances_array[j]][counters[k]] = final_hash[instances_array[j]][counters[k]] + inst_count_time_val;
				}
				else{
					final_hash[instances_array[j]][counters[k]] = inst_count_time_val;
				}
            }

        }
    }


}
function fetch_data_between_time_range(regex, counters, files_array,t1, t2){
    for(var i=0; i<files_array.length; i++)
    {
        fetch(file_array[i])
		.then(function(resp){
			return resp.json();
		})
		.then(function(data){
        traverse_data_for_one_file(regex, counters, data, t1, t2);
    });
    }
}
function getvalue_func() {
    var cloud_name = document.getElementById('cloud_name').value;
    var origi_date1 = document.getElementById('dp1').value;
    var origi_date2 = document.getElementById('dp2').value;
    var date1 = new Date(origi_date1);
    var date2 = new Date(origi_date2);
    var gmt1 = date1.toUTCString();
    var gmt2 = date2.toUTCString();
    var epoch1 = date1.getTime() / 1000;
    var epoch2 = date2.getTime() / 1000;
    var gmt_start_date = gmt_date(gmt1);
    var gmt_end_date = gmt_date(gmt2);
    // console.log(origi_date1, origi_date2, date1, date2, gmt1, gmt2, epoch1, epoch2);
    console.log(gmt1, gmt2, gmt_start_date, gmt_end_date);
    var regex = document.getElementById('regex_name').value;
    var counters = [];
    var x = document.getElementById("counter");
    for (var i = 0; i < x.options.length; i++) {
        if (x.options[i].selected == true) {
            counters.push(x.options[i].value);
        }
    }
    if (epoch1 > epoch2) {
        console.log("Please enter correct range");
    }
    else {
        if (gmt_start_date == gmt_end_date) {
            var t1 = epoch1;
            var t2 = epoch2;
            console.log("you will get todays logs");
            var log_folder = './counter_mon_logs/'+cloud_name +'/'+gmt_start_date;
            var files_array = [log_folder+"/1.json",log_folder+"/2.json",log_folder+"/3.json",log_folder+"/4.json" ];
            fetch_data_between_time_range(regex, counters, files_array,t1, t2);
        }
        else {
            console.log("you will get all day data");
            var dateArr = getDateArray(date1, date2);
            console.log(dateArr);
            var gmtArr = get_gmt_array(dateArr);
            console.log(gmtArr);
            var gmtdateArr = gmt_date_array(gmtArr);
            console.log(gmtdateArr);
            var files_array = [];
            for(var i=0;i<gmtdateArr.length;i++){
                files_array.push('./counter_mon_logs/'+cloud_name +'/'+gmtdateArr[i]+'/1.json');
                files_array.push('./counter_mon_logs/'+cloud_name +'/'+gmtdateArr[i]+'/2.json');
                files_array.push('./counter_mon_logs/'+cloud_name +'/'+gmtdateArr[i]+'/3.json');
                files_array.push('./counter_mon_logs/'+cloud_name +'/'+gmtdateArr[i]+'/4.json');
            }
            console.log(files_array);
            fetch_data_between_time_range(regex, counters, files_array,t1, t2);
        }
    }

}













// if(y1 == y2)
// {
//     if(m1==m2){
//         if(d2-d1 == 1)
//         {
//             var t1 = epoch1;
//             var t2 = epoch2;
//             console.log("you will get todays logs");
//             var log_folder1 = './counter_mon_logs/'+cloud_name +'/'+gmt_start_date;
//             var log_folder2 = './counter_mon_logs/'+cloud_name +'/'+gmt_end_date;
//             var files_array = [log_folder1+"/1.json",log_folder2+"/2.json",log_folder2+"/3.json",log_folder2+"/4.json",log_folder2+"/1.json",log_folder2+"/2.json",log_folder2+"/3.json",log_folder2+"/4.json" ];
//             fetch_data_between_time_range(regex, counters, files_array,t1, t2);            
//         }
        
//     }

// }
// else
// {

// }