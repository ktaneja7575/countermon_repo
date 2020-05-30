var final_hash = {};
var comp_hash = {};
var hash_thres = {};
var hash_interv = {};
// var tex;
// var counter_val, instance_val;
function gmt_date(gmt) {
    var z = String(gmt);
    console.log(z.length);
    var day = z[5] + z[6];
    var mon;
    var year = z[14] + z[15];
    var mon_str = z[8] + z[9] + z[10];
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (var i = 0; i < 11; i++) {
        if (month[i] == mon_str) {
            mon = i + 1;
        }
    }
    var s = String(mon);
    if (s.length == 2) {
        var gmt_d = day + "-" + mon + "-" + year;
    }
    else {
        var gmt_d = day + "-0" + mon + "-" + year;
    }
    // var gmt_d = z[5] + z[6] + z[7] + z[8] + z[9] + z[10] + z[11] + z[12] + z[13] + z[14] + z[15];
    return gmt_d;
}

function get_new_format(str){
    var p = String(str);

    var day = p[8] + p[9];
    var mon;
    var year = p[13] + p[14];
    var mon_str = p[4] + p[5] + p[6];
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (var i = 0; i < 11; i++) {
        if (month[i] == mon_str) {
            mon = i + 1;
        }
    }
    var s = String(mon);
    if (s.length == 2) {
        var dat = day + "-" + mon + "-" + year;
    }
    else {
        var dat = day + "-0" + mon + "-" + year;
    }

    var tim = p[16]+p[17]+p[18]+p[19]+p[20];
    var chng_str = dat+"  "+tim;
    return chng_str;
}

function get_new_format3(str){
    var p = String(str);
    var chng_str = p[0]+p[1]+p[2]+p[3]+p[4]+p[5]+p[6]+p[7]+p[8]+p[9]+p[10]+p[11]+p[12]+p[13]+p[14];
    return chng_str;
}


function get_new_format2(str){
    var p = String(str);
    var chng_str = p[0]+p[1]+p[2]+p[3]+p[4]+p[5]+p[6]+p[7]+p[8]+p[9]+p[10]+p[11]+p[12]+p[13]+p[14]+p[15]+p[16]+p[17]+p[18]+p[19]+p[20]+p[21]+p[22]+p[23]+" (IST)";
    return chng_str;
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
        // console.log(object_getter);
        if (instances_array[j] in final_hash) {
            console.log("alread exist instance");
            var objx = final_hash[instances_array[j]];
        }
        else {
            final_hash[instances_array[j]] = {};
        }
        if (instances_array[j] in comp_hash) {
            console.log("alread exist instance");
            // var objx = final_hash[instances_array[j]];
        }
        else {
            comp_hash[instances_array[j]] = {};
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
                var array_for_counter_time = [];
                // if(object_getter[counters[k]][time_value].length)
                // {
                //     alert(object_getter[counters[k]][time_value].length);
                // }
                if(counters[k] in object_getter)
                {
                    for (var c = 0; c < object_getter[counters[k]][time_value].length; c = c + 2) {
                        if (object_getter[counters[k]][time_value][c] >= t1 && object_getter[counters[k]][time_value][c] <= t2) {
                            inst_count_time_val++;
                            array_for_counter_time.push(object_getter[counters[k]][time_value][c]);
                            array_for_counter_time.push(object_getter[counters[k]][time_value][c+1]);
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
                if (counters[k] in comp_hash[instances_array[j]]) {
                    console.log("you are in counter");
                    comp_hash[instances_array[j]][counters[k]] = comp_hash[instances_array[j]][counters[k]].concat(array_for_counter_time);
                }
                else {

                    comp_hash[instances_array[j]][counters[k]] = array_for_counter_time;
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
    }
    console.log(final_hash);
    console.log(comp_hash);
    // show_table(counters);
}

// function Data_for_last_cron(data) {
//     document.getElementById("demo").innerHTML = "now u can analyse data till last crone time";
// }
function fetch_data_between_time_range(regex, counters, file_getter, t1, t2, e1, e2) {



    let data_file = fetch(file_getter);
    Promise.all([data_file])
        .then(files => {
            files.forEach(file => {
                process(file.json());
            })
        })
        .catch(err => {
        });
    let process = (prom) => {
        prom.then(data => {
            traverse_data_for_one_file(regex, counters, data, t1, t2);

            show_table(counters, e1, e2);
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

function traverse_files(regex, counters, files_array, t1, t2, e1, e2) {
    for (var i = 0; i < files_array.length; i++) {
        fetch_data_between_time_range(regex, counters, files_array[i], t1, t2,e1,e2);
    }
}
function cloud(row_col)
{
    
    var arr = new Array();
   arr = row_col.split("*");
   var inst = arr[0];
   var coun = arr[1];
   var th = arr[2];
   var inte = arr[3];
   var hit = arr[4];
   alert(row_col);
   alert(inst);
   alert(coun);
    localStorage.setItem('inst_name', JSON.stringify(inst));
    localStorage.setItem('coun_name', JSON.stringify(coun));
    localStorage.setItem('thres_value', JSON.stringify(th));
    localStorage.setItem('interval_value', JSON.stringify(inte));
    localStorage.setItem('hit_value', JSON.stringify(hit));
    var pass_arr = comp_hash[inst][coun];
    sessionStorage.setItem('time_hash', JSON.stringify(pass_arr));
    // window.location.href="expand_cell.html";
    window.open("./expand_cell.html", "_blank");
}


function show_table(final_counter_array,e1, e2) {
    var flag = 0;
    // alert(e1);
    // alert(e2);
    var new_time1= get_new_format(new Date(e1*1000));
    var new_time2= get_new_format(new Date(e2*1000));
    document.getElementById("div_to_display_searched_contents").innerHTML = "";

    var table_element = document.createElement("TABLE");
    table_element.setAttribute("id", "table_main");
    table_element.setAttribute("style", "border: 1px solid black; border-collapse: collapse; margin-left:auto;margin-right:auto; padding:50px;");
    var table_row1 = document.createElement("tr");
    table_row1.setAttribute("style", "border: 1px solid black;border-collapse: collapse;  padding:10px; background-color:rgb(175, 200, 247)");
    var table_heading = document.createElement("th");
    table_heading.setAttribute("style", "border: 1px solid black;border-collapse: collapse;text-align: center;  padding:10px; ");
    var text = document.createTextNode("INSTANCE NAME");
    table_heading.appendChild(text);
    table_row1.appendChild(table_heading);
    table_element.appendChild(table_row1);
    for (var p = 0; p < final_counter_array.length; p++) {
        table_heading = document.createElement("th");
        table_heading.setAttribute("style", "border: 1px solid black;border-collapse: collapse;text-align: center;  padding:10px");
        text = document.createTextNode(final_counter_array[p] + " thres:" + hash_thres[final_counter_array[p]] + " time-interval:" + hash_interv[final_counter_array[p]]);
        table_heading.appendChild(text);
        table_row1.appendChild(table_heading);
        table_element.appendChild(table_row1);
    }

    for (var i = 0; i < Object.keys(final_hash).length; i++) {
        // document.write(Object.keys(final_hash)[i]);
        var x = Object.values(final_hash)[i];
        table_row1 = document.createElement("tr");
        table_row1.setAttribute("style", "border: 1px solid black;border-collapse: collapse; padding:10px");
        var table_data1 = document.createElement("td");
        // table_data.classList.add("mystyle");
        table_data1.setAttribute("style", "border: 1px solid black;border-collapse: collapse; padding:10px; background-color: rgb(175, 200, 247)");
        text = document.createTextNode(Object.keys(final_hash)[i]);
        table_data1.appendChild(text);
        table_row1.appendChild(table_data1);
        // table_element.appendChild(table_row1);
        for (var p = 0; p < final_counter_array.length; p++) {
           var table_data = document.createElement("td");
           var instance_val = Object.keys(final_hash)[i];
           var counter_val = final_counter_array[p];
           var counter_thres_val = hash_thres[final_counter_array[p]];
           var counter_inter_val = hash_interv[final_counter_array[p]];
           var hit_val = x[final_counter_array[p]];
            // table_data.classList.add("mystyle");
            var inst_count = instance_val+"*"+counter_val+"*"+counter_thres_val+"*"+counter_inter_val+"*"+hit_val;
            // alert(inst_count);
            table_data.setAttribute("style", "border: 1px solid black;border-collapse: collapse; text-align:center;");
            table_data.setAttribute("id", inst_count);
            table_data.setAttribute("onclick", "cloud(id)");
            // Object.assign(table_data, {
            //     className: 'td_class',
            //     onclick: function abc(tex) {
            //       alert(tex);
            //       var instance_val= tex;
            //     //   var counter_val = final_counter_array[p];
                  
            //       localStorage.setItem('inst_name', JSON.stringify(instance_val));
            //       window.location.href="expand_cell.html";
            //     //   set_value_to_local_storage(instance_val, counter_val);
            //     }
            //   })
            var table_data1 = document.createElement("td");
            table_data1.setAttribute("style", "border: 1px solid black;border-collapse: collapse; text-align:center; background-color:green;");

            if (final_counter_array[p] in Object.values(final_hash)[i]) {
                if (x[final_counter_array[p]] != 0) {
                    flag = 1;
                    text = document.createTextNode(x[final_counter_array[p]]);
                table_data.appendChild(text);
                table_row1.appendChild(table_data);
                }
                else{
                    text = document.createTextNode("All OK");
                    table_data1.appendChild(text);
                    table_row1.appendChild(table_data1);
                }
                
            }
            else {
                text = document.createTextNode("All OK");
                table_data1.appendChild(text);
                table_row1.appendChild(table_data1);
            }


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
    if (Object.keys(final_hash)[0] == "undefined" || flag == 0) {
        var temp_div = document.createElement("div");
        temp_div.setAttribute("class", "alert");
        temp_div.className = "alert";
        var text = document.createTextNode("No logs found for the time ranges from "+ new_time1 +" to "+ new_time2+"!!");
        temp_div.appendChild(text);
        document.getElementById("div_to_display_searched_contents").appendChild(temp_div);
        // document.getElementById("div_to_display_searched_contents").innerHTML = "No logs found between these ranges !!";
    }
    else {
        var master_div = document.createElement("div");
        var text_div = document.createElement("div");
        text_div.setAttribute("style", "font-size:20px;text-align:center;padding:10px;");
        var text = document.createTextNode("Countermon Report [ From: " + new_time1 + " To: " + new_time2 + " ]");
        // text.setAttribute("style","font-size:20px;text-align:center");
        text_div.appendChild(text);
        master_div.appendChild(text_div);

        var temp_div = document.createElement("div");
        temp_div.setAttribute("class", "scrollable");
        temp_div.className = "scrollable";
        temp_div.appendChild(table_element);
        master_div.appendChild(temp_div);
        document.getElementById("div_to_display_searched_contents").appendChild(master_div);
    }
}
// function get_gmt_from_file(gmt_file) {
//     alert(gmt_file);
// }
function getvalue_func(counters_from_ajax, data) {
    final_hash = {};
    comp_hash = {};
    document.getElementById("msg_for_no_data").innerHTML = "";
    document.getElementById("msg_for_remain_data").innerHTML = "";
    document.getElementById("div_to_display_searched_contents").innerHTML = "";
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
    console.log(origi_date1, origi_date2, date1, date2, gmt1, gmt2, epoch1, epoch2, gmt_start_date, gmt_end_date);
    // console.log(gmt1, gmt2, gmt_start_date, gmt_end_date);
    var regex = document.getElementById('regex_name').value;
    var counters = [];
    counters = counters_from_ajax;
    // var x = document.getElementById("counter");
    // for (var i = 0; i < x.options.length; i++) {
    //     if (x.options[i].selected == true) {
    //         counters.push(x.options[i].value);
    //     }
    // }
    // console.log(counters.length);
    var files_array = [];
    var pre_epoch = epoch1 - 14400;
    var pre_date = new Date(pre_epoch * 1000);
    var pre_gmt_time = pre_date.toUTCString();
    var pre_gmt_date = gmt_date(pre_gmt_time);

    console.log(pre_date, pre_gmt_time, pre_gmt_date);
    if (gmt_start_date != pre_gmt_date) {
        files_array.push('./counter_mon_logs/' + cloud_name + '/' + pre_gmt_date + '/6.json')
    }
    // get_gmt_data("./counter_mon_logs/timestamp");
    // var last_cron_gmt = s;
    // var last_cron_gmt = data;
    // alert(last_cron_gmt);
    // console.log(last_cron_gmt);
    var last_cron_epoch = new Date(data).getTime() / 1000;
    var curr_epoch = new Date().getTime() / 1000;
    var next_cron_epoch = last_cron_epoch + 14400;
    var next_cron_time = new Date(next_cron_epoch * 1000);
    console.log(last_cron_epoch, next_cron_epoch);
    if (counters.length == 0) {
        var temp_div = document.createElement("div");
        temp_div.setAttribute("class", "alert");
        temp_div.className = "alert";
        var text = document.createTextNode("You did not select any counter, To get log Count please select Counters!!");
        temp_div.appendChild(text);
        document.getElementById("msg_for_no_data").appendChild(temp_div);
        // document.getElementById("msg_for_no_data").innerHTML = "You did not select any intances, To get log Count please select Counters!!";
    }
    else if (epoch1 > epoch2) {
        console.log("Please enter correct range");
        var temp_div = document.createElement("div");
        temp_div.setAttribute("class", "alert");
        temp_div.className = "alert";
        var text = document.createTextNode("Please enter correct Range!!");
        temp_div.appendChild(text);
        document.getElementById("msg_for_no_data").appendChild(temp_div);
        // document.getElementById("msg_for_no_data").innerHTML = "Please enter correct Range!!";
    }
    else if (epoch1 > last_cron_epoch && epoch2 < curr_epoch) {
        console.log("Please enter correct range");
        var temp_div = document.createElement("div");
        temp_div.setAttribute("class", "alert");
        temp_div.className = "alert";
        var text = document.createTextNode("you will get the stats for this time period at " + String(next_cron_time) + ".");
        temp_div.appendChild(text);
        document.getElementById("msg_for_no_data").appendChild(temp_div);
        // document.getElementById("msg_for_no_data").innerHTML = "you will get the stats for this time period at "+ String(next_cron_time);
    }


    // Code for one file
    // var files_array = ["./counter_mon_logs/beta/18 May 2020/18_1.json","./counter_mon_logs/beta/20 May 2020/20_1.json"];
    // var t1 = epoch1;
    // var t2 = epoch2;
    // traverse_files(regex, counters, files_array,t1, t2);

    else {
            if (epoch2 > last_cron_epoch) {
            if (gmt_start_date == gmt_end_date) {
                var t1 = epoch1;
                var t2 = epoch2;
                console.log("you will get todays logs");
                var x = String(gmt_start_date);
                // var pre = x[0] + x[1] + "_";
                var log_folder = './counter_mon_logs/' + cloud_name + '/' + gmt_start_date + '/';
                for (var num = 1; num <= 6; num++) {
                    files_array.push(log_folder + num + '.json');
                }
                traverse_files(regex, counters, files_array, t1, t2, epoch1, last_cron_epoch);
                console.log(files_array);
            }
            else {
                console.log("you will get all day data");
                var t1 = epoch1;
                var t2 = epoch2;
                var dateArr = getDateArray(date1, date2);
                console.log(dateArr);
                var gmtArr = get_gmt_array(dateArr);
                console.log(gmtArr);
                var gmtdateArr = gmt_date_array(gmtArr);
                if(gmtdateArr[0] != gmt_start_date)
                {
                    gmtdateArr.push(gmt_start_date);
                }
                if(gmtdateArr[gmtdateArr.length-1] != gmt_end_date)
                {
                    gmtdateArr.push(gmt_end_date);
                }
                console.log(gmtdateArr);
                for (var i = 0; i < gmtdateArr.length; i++) {
                    var x = String(gmtdateArr[i]);
                    // var pre = x[0] + x[1] + "_";
                    var log_folder = './counter_mon_logs/' + cloud_name + '/' + gmtdateArr[i] + '/';
                    for (var num = 1; num <= 6; num++) {
                        files_array.push(log_folder + num + '.json');
                    }
                }
                console.log(files_array);
                traverse_files(regex, counters, files_array, t1, t2, epoch1, last_cron_epoch);
            }
            console.log("Please enter correct range");
            var temp_div = document.createElement("div");
            temp_div.setAttribute("class", "alert");
            temp_div.className = "alert";
            var text = document.createTextNode("* The remaining time period will be availble at " + String(next_cron_time) + ".");
            temp_div.appendChild(text);
            document.getElementById("msg_for_remain_data").appendChild(temp_div);
            // document.getElementById("msg_for_remain_data").innerHTML = "Data for the remaining time period will be availble at "+ String(next_cron_time);
        }
        else{
            if (gmt_start_date == gmt_end_date) {
                var t1 = epoch1;
                var t2 = epoch2;
                console.log("you will get todays logs");
                var x = String(gmt_start_date);
                // var pre = x[0] + x[1] + "_";
                var log_folder = './counter_mon_logs/' + cloud_name + '/' + gmt_start_date + '/';
                for (var num = 1; num <= 6; num++) {
                    files_array.push(log_folder + num + '.json');
                }
                traverse_files(regex, counters, files_array, t1, t2, epoch1, epoch2);
                console.log(files_array);
            }
            else {
                console.log("you will get all day data");
                var t1 = epoch1;
                var t2 = epoch2;
                var dateArr = getDateArray(date1, date2);
                console.log(dateArr);
                var gmtArr = get_gmt_array(dateArr);
                console.log(gmtArr);
                var gmtdateArr = gmt_date_array(gmtArr);
                if(gmtdateArr[0] != gmt_start_date)
                {
                    gmtdateArr.push(gmt_start_date);
                }
                if(gmtdateArr[gmtdateArr.length-1] != gmt_end_date)
                {
                    gmtdateArr.push(gmt_end_date);
                }
                console.log(gmtdateArr);
                for (var i = 0; i < gmtdateArr.length; i++) {
                    var x = String(gmtdateArr[i]);
                    // var pre = x[0] + x[1] + "_";
                    var log_folder = './counter_mon_logs/' + cloud_name + '/' + gmtdateArr[i] + '/';
                    for (var num = 1; num <= 6; num++) {
                        files_array.push(log_folder + num + '.json');
                    }
                }
                console.log(files_array);
                traverse_files(regex, counters, files_array, t1, t2, epoch1, epoch2);
            }
            // console.log("Please enter correct range");
            // var temp_div = document.createElement("div");
            // temp_div.setAttribute("class", "alert");
            // temp_div.className = "alert";
            // var text = document.createTextNode("* The above displayed Report is between the Data for the remaining time period will be availble at " + String(next_cron_time));
            // temp_div.appendChild(text);
            // document.getElementById("msg_for_remain_data").appendChild(temp_div);
            // document.getElementById("msg_for_remain_data").innerHTML = "Data for the remaining time period will be availble at "+ String(next_cron_time);
        }

        }
    }


function get_gmt_data(counters_from_ajax) {
    gmt_file = "./timestamp";
    let data_file = fetch(gmt_file);
    // alert(data_file);
    Promise.all([data_file])
        .then(files => {
            files.forEach(file => {
                process(file.text());
            })
        })
        .catch(err => {
        });
    let process = (prom) => {
        prom.then(data => {
            // alert(data);
            getvalue_func(counters_from_ajax, data);
        })
    }
}

// function set_value_to_local_storage(instance_val, counter_val)
// {

// 	localStorage.setItem('inst_name', JSON.stringify(instance_val));
// }
function show_exp_data(){
    // console.log(optn)
    document.getElementById("expanded_table").innerHTML=" ";
    var optn = document.getElementById("select_date");
    var arr_for_time = JSON.parse(sessionStorage.getItem('time_hash'));
    console.log(arr_for_time.length);
    var d = optn.options[optn.selectedIndex].value;
    var final_arr = new Array();
    for(var i=0;i<arr_for_time.length;i=i+2){
        var str = get_new_format3(new Date(arr_for_time[i]*1000));
        if(d == str)
        {
            final_arr.push(arr_for_time[i]);
            final_arr.push(arr_for_time[i+1]);
        }
    }

    var master_div = document.createElement("div");
    master_div.setAttribute("id", "master");

    var div1 = document.createElement("div");
    div1.setAttribute("class", "div_class");    
    var table1 = document.createElement("table");
    table1.setAttribute("class", "table");
    var t_h1 = document.createElement("thead");
    var r1 = document.createElement("tr");
    var h_time1 = document.createElement("th");
    var h_t1 = document.createTextNode("Time");
    h_time1.appendChild(h_t1);
    var h_value1 = document.createElement("th");
    var h_v1 = document.createTextNode("Value");
    h_value1.appendChild(h_v1);
    r1.appendChild(h_time1);
    r1.appendChild(h_value1);
    t_h1.appendChild(r1);
    table1.appendChild(t_h1);
    div1.appendChild(table1);
    master_div.appendChild(div1);



    var div2 = document.createElement("div");
    div2.setAttribute("class", "div_class");    
    var table2 = document.createElement("table");
    table2.setAttribute("class", "table");
    var t_h2 = document.createElement("thead");
    var r2 = document.createElement("tr");
    var h_time2 = document.createElement("th");
    var h_t2 = document.createTextNode("Time");
    h_time2.appendChild(h_t2);
    var h_value2 = document.createElement("th");
    var h_v2 = document.createTextNode("Value");
    h_value2.appendChild(h_v2);
    r2.appendChild(h_time2);
    r2.appendChild(h_value2);
    t_h2.appendChild(r2);
    table2.appendChild(t_h2);
    div2.appendChild(table2);
    master_div.appendChild(div2);




    var div3 = document.createElement("div");
    div3.setAttribute("class", "div_class");    
    var table3 = document.createElement("table");
    table3.setAttribute("class", "table");
    var t_h3 = document.createElement("thead");
    var r3 = document.createElement("tr");
    var h_time3 = document.createElement("th");
    var h_t3 = document.createTextNode("Time");
    h_time3.appendChild(h_t3);
    var h_value3 = document.createElement("th");
    var h_v3 = document.createTextNode("Value");
    h_value3.appendChild(h_v3);
    r3.appendChild(h_time3);
    r3.appendChild(h_value3);
    t_h3.appendChild(r3);
    table3.appendChild(t_h3);
    div3.appendChild(table3);
    master_div.appendChild(div3);

    var size = final_arr.length/2;
    var s1 = parseInt(size/3);
    var s2 = s1*2;
    var c=1;
    for(var j=0; j<final_arr.length; j=j+2){
        var row = document.createElement("tr");
        var data1 = document.createElement("td");
        var time = document.createTextNode(get_new_format2(new Date(final_arr[j]*1000)));
        data1.appendChild(time);
        var data2 = document.createElement("td");
        var val = document.createTextNode(final_arr[j+1]);
        data2.appendChild(val);
        row.appendChild(data1);
        row.appendChild(data2);
        if(c<=s1)
        {
            table1.appendChild(row);
        }
        else if(c<=s2)
        {
            table2.appendChild(row);
        }
        else
        {
            table3.appendChild(row);
        }
        c++;
    }




   document.getElementById("expanded_table").appendChild(master_div);
// document.getElementById("expanded_table").innerHTML= final_arr.length;
}



function print_data(){
    var final_arr = JSON.parse(sessionStorage.getItem('time_hash'));
    var master_div = document.createElement("div");
    master_div.setAttribute("id", "master");

    var div1 = document.createElement("div");
    div1.setAttribute("class", "div_class");    
    var table1 = document.createElement("table");
    table1.setAttribute("class", "table");
    var t_h1 = document.createElement("thead");
    var r1 = document.createElement("tr");
    var h_time1 = document.createElement("th");
    var h_t1 = document.createTextNode("Time");
    h_time1.appendChild(h_t1);
    var h_value1 = document.createElement("th");
    var h_v1 = document.createTextNode("Value");
    h_value1.appendChild(h_v1);
    r1.appendChild(h_time1);
    r1.appendChild(h_value1);
    t_h1.appendChild(r1);
    table1.appendChild(t_h1);
    div1.appendChild(table1);
    master_div.appendChild(div1);



    var div2 = document.createElement("div");
    div2.setAttribute("class", "div_class");    
    var table2 = document.createElement("table");
    table2.setAttribute("class", "table");
    var t_h2 = document.createElement("thead");
    var r2 = document.createElement("tr");
    var h_time2 = document.createElement("th");
    var h_t2 = document.createTextNode("Time");
    h_time2.appendChild(h_t2);
    var h_value2 = document.createElement("th");
    var h_v2 = document.createTextNode("Value");
    h_value2.appendChild(h_v2);
    r2.appendChild(h_time2);
    r2.appendChild(h_value2);
    t_h2.appendChild(r2);
    table2.appendChild(t_h2);
    div2.appendChild(table2);
    master_div.appendChild(div2);




    var div3 = document.createElement("div");
    div3.setAttribute("class", "div_class");    
    var table3 = document.createElement("table");
    table3.setAttribute("class", "table");
    var t_h3 = document.createElement("thead");
    var r3 = document.createElement("tr");
    var h_time3 = document.createElement("th");
    var h_t3 = document.createTextNode("Time");
    h_time3.appendChild(h_t3);
    var h_value3 = document.createElement("th");
    var h_v3 = document.createTextNode("Value");
    h_value3.appendChild(h_v3);
    r3.appendChild(h_time3);
    r3.appendChild(h_value3);
    t_h3.appendChild(r3);
    table3.appendChild(t_h3);
    div3.appendChild(table3);
    master_div.appendChild(div3);

    var size = final_arr.length/2;
    var s1 = parseInt(size/3);
    var s2 = s1*2;
    var c=1;
    for(var j=0; j<final_arr.length; j=j+2){
        var row = document.createElement("tr");
        var data1 = document.createElement("td");
        var time = document.createTextNode(get_new_format2(new Date(final_arr[j]*1000)));
        data1.appendChild(time);
        var data2 = document.createElement("td");
        var val = document.createTextNode(final_arr[j+1]);
        data2.appendChild(val);
        row.appendChild(data1);
        row.appendChild(data2);
        if(c<=s1)
        {
            table1.appendChild(row);
        }
        else if(c<=s2)
        {
            table2.appendChild(row);
        }
        else
        {
            table3.appendChild(row);
        }
        c++;
    }


   document.getElementById("expanded_table").appendChild(master_div);
}





function expanded_data()
{
    var instance = JSON.parse(localStorage.getItem('inst_name'));
    var counter = JSON.parse(localStorage.getItem('coun_name'));
    var threshold = JSON.parse(localStorage.getItem('thres_value'));
    var interval = JSON.parse(localStorage.getItem('interval_value'));
    var toatalhit = JSON.parse(localStorage.getItem('hit_value'));
    var arr_for_time = JSON.parse(sessionStorage.getItem('time_hash'));
    // console.log(typeof(hash_for_time));


    console.log(arr_for_time.length);
    var d1 =0;
    var dates = new Array();
    for(var i=0;i<arr_for_time.length;i=i+2)
    {
        var d2 = get_new_format3(new Date(arr_for_time[i]*1000));
        if(d2 != d1){
            dates.push(d2);
            d1 = d2;
        }
    }
    console.log(dates.length);
    console.log(dates);





    var table_1 = document.createElement("table");
    table_1.setAttribute("class", "table1");
    var table1_r = document.createElement("tr");

    var table1_h1 = document.createElement("th");
    var table1_i = document.createTextNode("Instance: "+instance);
    table1_h1.appendChild(table1_i);


    var table1_h2 = document.createElement("th");
    var table1_c = document.createTextNode("counter: "+counter);
    table1_h2.appendChild(table1_c);

    var table1_h3 = document.createElement("th");
    var table1_t = document.createTextNode("Threshold Value: "+threshold);
    table1_h3.appendChild(table1_t);

    var table1_h4 = document.createElement("th");
    var table1_l = document.createTextNode("Time Interval:"+ interval);
    table1_h4.appendChild(table1_l);

    var table1_h5 = document.createElement("th");
    var table1_hi = document.createTextNode("Total Hits: "+toatalhit);
    table1_h5.appendChild(table1_hi);

    table1_r.appendChild(table1_h1);
    table1_r.appendChild(table1_h2);
    table1_r.appendChild(table1_h3);
    table1_r.appendChild(table1_h4);
    table1_r.appendChild(table1_h5);
    
    table_1.appendChild(table1_r);
    var master = document.createElement("div");
    master.appendChild(table_1);
   
if(dates.length >1){

table_2 = document.createElement("table");
table_2.setAttribute("class", "table2");
var table2_r = document.createElement("tr");


var table1_h6 = document.createElement("th");   
var sel = document.createElement("select");
sel.setAttribute("id", "select_date");
var sel_text = document.createTextNode("Select Date: ");
table1_h6.appendChild(sel_text)
table1_h6.appendChild(sel);



var table1_h7 = document.createElement("th");
var but = document.createElement("button");
var t = document.createTextNode("Show");
but.appendChild(t);
but.setAttribute("id", "button");
but.setAttribute("onclick", "show_exp_data()");
table1_h7.appendChild(but);

// table1_r.appendChild(table1_h5);
table2_r.appendChild(table1_h6);
table2_r.appendChild(table1_h7);

table_2.appendChild(table2_r);

master.appendChild(table_2);
}

document.getElementById("info").appendChild(master);


// console.log(arr_for_time.length);
// var d1 =0;
// var dates = new Array();
// for(var i=0;i<arr_for_time.length;i=i+2)
// {
//     var d2 = get_new_format3(new Date(arr_for_time[i]*1000));
//     if(d2 != d1){
//         dates.push(d2);
//         d1 = d2;
//     }
// }
if(dates.length > 1){
console.log(dates.length);
console.log(dates);
var slect = document.getElementById("select_date");
for (var i = 0; i < dates.length; i++) { 
    var optn = dates[i]; 
    var el = document.createElement("option"); 
    // el.setAttribute("style", "padding:10px");
    // el.setAttribute("id", optn);
    // el.setAttribute("onclick", "show_exp_data(optn)");
    el.textContent = optn; 
    el.value = optn; 
    slect.appendChild(el); 
}

}
else{
    print_data();
}
}










    // var time_val_arr = arr_for_time;
    // console.log(arr_for_time.length);
    
    // var main = document.createElement("div");

    // var master = document.createElement("div");
    // master.setAttribute("style", "margin-left:10%; ");
    // var master_div1 = document.createElement("div");
    // master_div1.setAttribute("style", "float:left; width:30%");
    // var master_div2 = document.createElement("div");
    // master_div2.setAttribute("style", "float:left; width:30%");
    // var master_div3 = document.createElement("div");
    // master_div3.setAttribute("style", "float:left; width:30%");

    // var d1 =0;
    // var total = time_val_arr.length;
    // var val_num = total/2;
    // var k = val_num/3;
    // var j= k*2;
    // var q,f,i=0;
    // for(i;i<j;i=i+2){
    //     var t = get_new_format2(new Date(time_val_arr[i]*1000));
    //     var s = String(t);
    //     var d2 = s[8]+s[9];
    //     if(d1 != d2){
    //         d1 = d2;

    //         var ex_table1 = document.createElement("Table");
    //         ex_table1.setAttribute("class", "table2");
    //         var table_h = document.createElement("thead");
    //         var ex_table_row_head = document.createElement("tr");
    //         var ex_table_head = document.createElement("th");
    //         var heading_time = document.createTextNode("Time");
    //         ex_table_head.appendChild(heading_time);
    //         ex_table_row_head.appendChild(ex_table_head);
    //         var ex_table_head1 = document.createElement("th");
    //         var heading_value = document.createTextNode("Value");
    //         ex_table_head1.appendChild(heading_value);
    //         ex_table_row_head.appendChild(ex_table_head1);
    //         table_h.appendChild(ex_table_row_head);
    //         ex_table1.appendChild(table_h);
    //         master_div1.appendChild(ex_table1);
    //     }
    //     var text_time = document.createTextNode(t);
    //     var text_val = document.createTextNode(time_val_arr[i+1]);
    //     var data_time = document.createElement("td");
    //     var data_val = document.createElement("td");
    //     var row = document.createElement("tr");
    //     data_time.appendChild(text_time);
    //     row.appendChild(data_time);
    //     data_val.appendChild(text_val);
    //     row.appendChild(data_val);
    //     ex_table1.appendChild(row);

    // }

    // master.appendChild(master_div1);

    // for(q=i;q<(j*2);q=q+2){
    //     var t = get_new_format2(new Date(time_val_arr[q]*1000));
    //     var s = String(t);
    //     var d2 = s[8]+s[9];
    //     if(d1 != d2 || q ==i){
    //         if(d1 != d2){
    //             d1 = d2;
    //         }

    //         var ex_table1 = document.createElement("Table");
    //         ex_table1.setAttribute("class", "table2");
    //         var table_h = document.createElement("thead");
    //         var ex_table_row_head = document.createElement("tr");
    //         var ex_table_head = document.createElement("th");
    //         var heading_time = document.createTextNode("Time");
    //         ex_table_head.appendChild(heading_time);
    //         ex_table_row_head.appendChild(ex_table_head);
    //         var ex_table_head1 = document.createElement("th");
    //         var heading_value = document.createTextNode("Value");
    //         ex_table_head1.appendChild(heading_value);
    //         ex_table_row_head.appendChild(ex_table_head1);
    //         table_h.appendChild(ex_table_row_head);
    //         ex_table1.appendChild(table_h);
    //         master_div2.appendChild(ex_table1);
    //     }
    //     var text_time = document.createTextNode(t);
    //     var text_val = document.createTextNode(time_val_arr[q+1]);
    //     var data_time = document.createElement("td");
    //     var data_val = document.createElement("td");
    //     var row = document.createElement("tr");
    //     data_time.appendChild(text_time);
    //     row.appendChild(data_time);
    //     data_val.appendChild(text_val);
    //     row.appendChild(data_val);
    //     ex_table1.appendChild(row);
    // }
    // master.appendChild(master_div2);
    // for(f=q;f<total;f=f+2){
    //     var t = get_new_format2(new Date(time_val_arr[f]*1000));
    //     var s = String(t);
    //     var d2 = s[8]+s[9];
    //     if(d1 != d2 || f ==q){
    //         if(d1 != d2){
    //             d1 = d2;
    //         }
    //         var ex_table1 = document.createElement("Table");
    //         ex_table1.setAttribute("class", "table2");
    //         var table_h = document.createElement("thead");
    //         var ex_table_row_head = document.createElement("tr");
    //         var ex_table_head = document.createElement("th");
    //         var heading_time = document.createTextNode("Time");
    //         ex_table_head.appendChild(heading_time);
    //         ex_table_row_head.appendChild(ex_table_head);
    //         var ex_table_head1 = document.createElement("th");
    //         var heading_value = document.createTextNode("Value");
    //         ex_table_head1.appendChild(heading_value);
    //         ex_table_row_head.appendChild(ex_table_head1);
    //         table_h.appendChild(ex_table_row_head);
    //         ex_table1.appendChild(table_h);
    //         master_div3.appendChild(ex_table1);
    //     }
    //     var text_time = document.createTextNode(t);
    //     var text_val = document.createTextNode(time_val_arr[f+1]);
    //     var data_time = document.createElement("td");
    //     var data_val = document.createElement("td");
    //     var row = document.createElement("tr");
    //     data_time.appendChild(text_time);
    //     row.appendChild(data_time);
    //     data_val.appendChild(text_val);
    //     row.appendChild(data_val);
    //     ex_table1.appendChild(row);
    // }
    // master.appendChild(master_div3);

    // main.appendChild(master);
    // document.getElementById("expanded_table").appendChild(main);




