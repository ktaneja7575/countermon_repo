var final_hash = {};
var hash_thres = {};
var hash_interv = {};
function gmt_date(gmt) {
    var z = String(gmt);
    var gmt_d = z[6] + z[7] + z[8] + z[9] + z[10] + z[11] + z[12] + z[13] + z[14] + z[15] + z[16];
    return gmt_d;
}
function getDateArray(start, end) {
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
    }
    return arr;
}
function get_gmt_array(dateArray) {
    var gmtArray = [];
    for (var i = 0; i < dateArray.length; i++) {
        gmtArray[i] = dateArray[i].toUTCString();
    }
    return gmtArray;
}
function gmt_date_array(gmtArray) {
    var gmtdateArray = [];
    for (var i = 0; i < gmtArray.length; i++) {
        gmtdateArray[i] = gmt_date(gmtArray[i]);
    }
    return gmtdateArray;
}

function get_instances_return_array(data, input_tag_text) {
    var temp_array = new Array();
    for (var indexer = 0; indexer < data.length; indexer++) {
        if (data[indexer].instance_name.match(input_tag_text)) {
            temp_array.push(data[indexer].instance_name);
        }
    }
    return temp_array;
}
function get_object_corresponding_to_instance(data, instance) {
    for (var indexer = 0; indexer < data.length; indexer++) {
        if (data[indexer].instance_name == instance) {
            return data[indexer];
        }
    }
}
function traverse_data_for_one_file(regex, counters, data, t1, t2) {
    var instances_array = new Array();
    instances_array = get_instances_return_array(data, regex);
    for (var j = 0; j < instances_array.length; j++) {
        var object_getter = get_object_corresponding_to_instance(data, instances_array[j]);
        if (instances_array[j] in final_hash) {
            console.log("alread exist instance");
            var objx = final_hash[instances_array[j]];
        }
        else {
            final_hash[instances_array[j]] = {};
        }
        if ("NO_DATA_FOUND" in object_getter) {
            console.log("no data found");
        }
        else {
            for (var k = 0; k < counters.length; k++) {
                var time_value = counters[k] + "_time_values";
                var thres = counters[k] + "_threshold";
                var time_interval = counters[k] + "_time_interval";
                var inst_count_time_val = 0;
                for (var c = 0; c < object_getter[counters[k]][time_value].length; c = c + 2) {
                    if (object_getter[counters[k]][time_value][c] >= t1 && object_getter[counters[k]][time_value][c] <= t2) {
                        inst_count_time_val++;
                    }
                }
                // console.log(objx);
                if (counters[k] in final_hash[instances_array[j]]) {
                    console.log("you are in counter");
                    final_hash[instances_array[j]][counters[k]] = final_hash[instances_array[j]][counters[k]] + inst_count_time_val;
                }
                else {
                    
                    final_hash[instances_array[j]][counters[k]] = inst_count_time_val;
                }
                if (counters[k] in hash_thres) {
                    console.log("thrashold for this counter already exists");
                }
                else {
                    hash_thres[counters[k]] = object_getter[counters[k]][thres];
                }
                if (counters[k] in hash_interv) {
                    console.log("time interval for this counter already exists");
                }
                else {
                    hash_interv[counters[k]] = object_getter[counters[k]][time_interval];
                }
            }

        }
    }
    console.log(final_hash);
// show_table(counters);
}

function Data_for_last_cron(data) {
    document.getElementById("demo").innerHTML = "now u can analyse data till last crone time";
}
function fetch_data_between_time_range(regex, counters, file_getter, t1, t2) {



	let data_file=fetch(file_getter);
	Promise.all([data_file])
	.then( files => {files.forEach(file => { process(file.json());
	})
	})
	.catch (err=>{
	});
	let process = (prom) => {
		prom.then(data=>{
			traverse_data_for_one_file(regex, counters, data, t1, t2);
			show_table(counters);
		})
	}

         //fetch(file)
          //  .then(function (resp) {
            //    if (resp.status === 404) {
              //      return 0;
                //}
               // return resp.json();
            //})
            //.then(function (data) {
              //  if (data == 0) {
                //    Data_for_last_cron(data);
                //}
                //else {
                  //  traverse_data_for_one_file(regex, counters, data, t1, t2);
                //}

            //});
}

function traverse_files(regex, counters, files_array, t1, t2)
{
	for (var i = 0; i < files_array.length; i++) 
	{
		fetch_data_between_time_range(regex, counters, files_array[i], t1, t2);
	}
}


function show_table(final_counter_array) {
	document.getElementById("div_to_display_searched_contents").innerHTML="";
    var table_element = document.createElement("TABLE");
    table_element.setAttribute("style", "border: 1px solid black; border-collapse: collapse; margin-left:auto;margin-right:auto; padding:50px;");
    var table_row1 = document.createElement("tr");
    table_row1.setAttribute("style", "border: 1px solid black;border-collapse: collapse;  padding:15px; background-color:rgb(175, 200, 247)");
    var table_heading = document.createElement("th");
    table_heading.setAttribute("style", "border: 1px solid black;border-collapse: collapse;text-align: center;  padding:15px; ");
    var text = document.createTextNode("INSTANCE NAME");
    table_heading.appendChild(text);
    table_row1.appendChild(table_heading);
    table_element.appendChild(table_row1);
    for (var p = 0; p < final_counter_array.length; p++) {
        table_heading = document.createElement("th");
        table_heading.setAttribute("style", "border: 1px solid black;border-collapse: collapse;text-align: center;  padding:15px");
        text = document.createTextNode(final_counter_array[p] + " thrs:" + hash_thres[final_counter_array[p]] + " time-interval:" + hash_interv[final_counter_array[p]]);
        table_heading.appendChild(text);
        table_row1.appendChild(table_heading);
        table_element.appendChild(table_row1);
    }

    for (var i = 0; i < Object.keys(final_hash).length; i++) {
        // document.write(Object.keys(final_hash)[i]);
        var x = Object.values(final_hash)[i];
        table_row1 = document.createElement("tr");
        table_row1.setAttribute("style", "border: 1px solid black;border-collapse: collapse; padding:15px");
        var table_data = document.createElement("td");
        // table_data.classList.add("mystyle");
        table_data.setAttribute("style", "border: 1px solid black;border-collapse: collapse; padding:15px");
        text = document.createTextNode(Object.keys(final_hash)[i]);
        table_data.appendChild(text);
        table_row1.appendChild(table_data);
        // table_element.appendChild(table_row1);
        for (var p = 0; p < final_counter_array.length; p++) {
            table_data = document.createElement("td");
            // table_data.classList.add("mystyle");
            table_data.setAttribute("style", "border: 1px solid black;border-collapse: collapse; text-align:center;");
            text = document.createTextNode(x[final_counter_array[p]]);
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
    var files_array = [];
    if (epoch1 > epoch2) {
        console.log("Please enter correct range");
    }
    // Code for one file
    var files_array = ["./counter_mon_logs/countermon_json_file_17-05-20_cloud_beta.json","./counter_mon_logs/countermon_json_file_18-05-20_cloud_beta.json"];
    // ,"./counter_mon_logs/countermon_json_file_18-05-20_cloud_beta.json"
    var t1 = epoch1;
    var t2 = epoch2;
    traverse_files(regex, counters, files_array,t1, t2);


    

    // else {
    //     if (gmt_start_date == gmt_end_date) {
    //         var t1 = epoch1;
    //         var t2 = epoch2;
    //         console.log("you will get todays logs");
    //         var log_folder = './counter_mon_logs/' + cloud_name + '/' + gmt_start_date + '/';
    //         for (var num = 1; num <= 6; num++) {
    //             files_array.push(log_folder + num + '.json');
    //         }
    //         // fetch_data_between_time_range(regex, counters, files_array,t1, t2);
    //         console.log(files_array);
    //     }
    //     else {
    //         console.log("you will get all day data");
    //         var dateArr = getDateArray(date1, date2);
    //         console.log(dateArr);
    //         var gmtArr = get_gmt_array(dateArr);
    //         console.log(gmtArr);
    //         var gmtdateArr = gmt_date_array(gmtArr);
    //         console.log(gmtdateArr);
    //         for (var i = 0; i < gmtdateArr.length; i++) {
    //             var log_folder = './counter_mon_logs/' + cloud_name + '/' + gmtdateArr[i] + '/';
    //             for (var num = 1; num <= 6; num++) {
    //                 files_array.push(log_folder + num + '.json');
    //             }
    //         }
    //         console.log(files_array);
    //         // fetch_data_between_time_range(regex, counters, files_array,t1, t2);
    //     }
    // }
}







