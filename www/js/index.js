/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app;
var ENVIRONMENTDATA = "environment_data_v2";
var PIPELINEDATA = "pipeline_data_label_v2";
var AUTHTOKEN = "auth_token";
// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
    kendo.mobile.ui.Drawer.current = null;
    app = new kendo.mobile.Application($(document.body), {skin: 'nova'});
    getCurrentEnvironments();
}

function  openWindow(url) {
    console.log('openWindow');

    window.open = cordova.InAppBrowser.open;

    var ref = cordova.InAppBrowser.open(url, '_blank', 'location=yes,toolbar=yes');

}

function getDefaultEnvironments()
{
    return [
        {
            "id": 1,
            "text": "Concourse CI",
            "url": "https://ci.concourse.ci",
            "user": "",
            "pass": ""
        }
        // {
        //     "id": 1,
        //     "text": "Dev",
        //     "url": "https://ci.concourse.ci",
        //     "user": "",
        //     "pass": ""
        // },
        // {
        //     "id": 2,
        //     "text": "PROD",
        //     "url": "https://ci.concourse.ci",
        //     "user": "",
        //     "pass": ""
        // }
    ];
}

function getPipeLines()
{
    var currentPipelines = jQuery.parseJSON(window.localStorage.getItem(PIPELINEDATA));
    if (currentPipelines == null) {
        currentPipelines = [];
        window.localStorage.setItem(PIPELINEDATA, JSON.stringify(currentPipelines));
    }
    return currentPipelines;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.hash);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function getJobUrl() {
    var pipelineid = getParameterByName('pipelineid');
    var pipelineUrl = '';
    var envId = 0;
    var envUrl = '';
    var envUser = '';
    var envPass = '';

    var pipeLines = getPipeLines();
    for (var i in pipeLines) {
        if (pipeLines[i].id == pipelineid) {
            pipelineUrl = pipeLines[i].url;
            envId = pipeLines[i].envid;
            break;
        }
    }


    var environments = getCurrentEnvironments();
    for (var i in environments) {
        if (environments[i].id == envId) {
            envUrl = environments[i].url;
            envUser = environments[i].user;
            envPass = environments[i].pass;
            break;

        }
    }
    var url = envUrl + '/api/v1/' + pipelineUrl + '/jobs';
    var result = '{"url":"'+url+'","user":"'+envUser+'","pass":"'+envPass+'","envUrl":"' + envUrl + '"}';

    return  JSON.parse(result);
}


function getPipelineUrl(envId) {
    var envUrl = '';
    var envUser = '';
    var envPass = '';

    var environments = getCurrentEnvironments();
    for (var i in environments) {
        if (environments[i].id == envId) {
            envUrl = environments[i].url;
            envUser = environments[i].user;
            envPass = environments[i].pass;
            break;

        }
    }
    var url = envUrl + '/api/v1/pipelines'
    console.log(envId + '-' + url);
    var result = '{"url":"'+url+'","user":"'+envUser+'","pass":"'+envPass+'","envUrl":"' + envUrl + '"}';

    return  JSON.parse(result);
}

function getAbortUrl() {
    var pipelineid = getParameterByName('pipelineid');
    var buildid = getParameterByName('buildid');
    var pipelineUrl = '';
    var envId = 0;
    var envUrl = '';
    var envUser = '';
    var envPass = '';

    var pipeLines = getPipeLines();
    for (var i in pipeLines) {
        if (pipeLines[i].id == pipelineid) {
            pipelineUrl = pipeLines[i].url;
            envId = pipeLines[i].envid;
            break;
        }
    }


    var environments = getCurrentEnvironments();
    for (var i in environments) {
        if (environments[i].id == envId) {
            envUrl = environments[i].url;
            envUser = environments[i].user;
            envPass = environments[i].pass;
            break;

        }
    }
    var url = envUrl + '/api/v1/builds/'+buildid+'/abort';
    var result = '{"url":"' + url + '","user":"' + envUser + '","pass":"' + envPass + '","envUrl":"' + envUrl + '"}';
    console.log(url);
    return  JSON.parse(result);
}

function getTriggerUrl() {
    var pipelineid = getParameterByName('pipelineid');
    var pipelineUrl = '';
    var envId = 0;
    var envUrl = '';
    var envUser = '';
    var envPass = '';

    var pipeLines = getPipeLines();
    for (var i in pipeLines) {
        if (pipeLines[i].id == pipelineid) {
            pipelineUrl = pipeLines[i].url;
            envId = pipeLines[i].envid;
            break;
        }
    }


    var environments = getCurrentEnvironments();
    for (var i in environments) {
        if (environments[i].id == envId) {
            envUrl = environments[i].url;
            envUser = environments[i].user;
            envPass = environments[i].pass;
            break;

        }
    }
    var url = envUrl + '/api/v1' + pipelineUrl + '/jobs';
    var jobname = getParameterByName('jobname');
    url += '/' + jobname + '/builds';
    var result = '{"url":"' + url + '","user":"' + envUser + '","pass":"' + envPass + '","envUrl":"' + envUrl + '"}';
    console.log('Trigger URL:' + url);
    return  JSON.parse(result);
}

function getBuildDetailUrl()
{
    var pipelineid = getParameterByName('pipelineid');
    var pipelineUrl = '';
    var envId = 0;
    var envUrl = '';
    var envUser = '';
    var envPass = '';

    var pipeLines = getPipeLines();
    for (var i in pipeLines) {
        if (pipeLines[i].id == pipelineid) {
            pipelineUrl = pipeLines[i].url;
            envId = pipeLines[i].envid;
            break;
        }
    }


    var environments = getCurrentEnvironments();
    for (var i in environments) {
        if (environments[i].id == envId) {
            envUrl = environments[i].url;
            envUser = environments[i].user;
            envPass = environments[i].pass;
            break;

        }
    }
    var buildid = getParameterByName('buildid');
    var url = envUrl + '/api/v1/builds/'+buildid+'/events';
    var result = '{"url":"'+url+'","user":"'+envUser+'","pass":"'+envPass+'","envUrl":"' + envUrl + '"}';

    return  JSON.parse(result);

}

function getBuildUrl() {
    var result = getJobUrl();
    var jobname = getParameterByName('jobname');
    result.url+='/'+jobname+'/builds';

    return  result;
}

function closePipelineModalView()
{
    $("#pipeline-add-modalview").kendoMobileModalView("close");
}

function closeEnvModalView() {
    $("#env-add-modalview").kendoMobileModalView("close");
}

function settingsClearAll()
{
    var localData = [];
    window.localStorage[PIPELINEDATA] = JSON.stringify(localData);
    window.localStorage[ENVIRONMENTDATA] = JSON.stringify(getDefaultEnvironments());
    kendo.mobile.application.navigate("index");
}

function getPipeLinesDataSource()
{

    var pipeline = getPipelineUrl($("#pipeline-add-envid").data("kendoDropDownList").value());
    var pipelineForEnvDataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: pipeline.url,
                cache: false,
                dataType: "json",
                type: 'GET',
                beforeSend: function (xhr) {
                    doAuthBeforeSend(xhr, pipeline.user, pipeline.pass, pipeline.envUrl)
                }
            }
        },
        error: function(e) {
            console.log("error");
            e.preventDefault();
            kendo.mobile.application.navigate("index");
        },
        schema: {
            model: {
                id: "id"
            }
        }
    });
    return pipelineForEnvDataSource;
}

function resetPipeLineDropDown(value) {
    var dropdownlist = $("#pipeline-add-pipeline").data("kendoDropDownList");
    if(dropdownlist!=null) {
        dropdownlist.destroy();
        dropdownlist = $("#pipeline-add-pipeline").kendoDropDownList({
            dataTextField: "name",
            dataValueField: "url",
            dataSource: getPipeLinesDataSource()
        }).data("kendoDropDownList");
    }
}

function initForm() {
    var pipelineDddEnvid = $("#pipeline-add-envid").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "id",
        dataSource: environmentsDataSource,
        dataBound: function() {
            this.select(0);
            resetPipeLineDropDown(this.value());
        },
        change: function() {
            resetPipeLineDropDown(this.value());
        }
    }).data("kendoDropDownList");



    var pipelineDddPipeline = $("#pipeline-add-pipeline").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "url",
        dataSource: getPipeLinesDataSource()
    }).data("kendoDropDownList");



    // var body = $(".km-pane");
    //
    // if (kendo.ui.DropDownList) {
    //     $("#dropdown").kendoDropDownList({
    //         popup: { appendTo: body },
    //         animation: { open: { effects: body.hasClass("km-android") ? "fadeIn" : body.hasClass("km-ios") || body.hasClass("km-wp") ? "slideIn:up" : "slideIn:down" } }
    //     });
    // }
}

function savePipelineModalView() {
    var localData = getPipeLines();
    var options = {
        data: {
            "id": 1,
            "text": "",
            "envid": "",
            "envname": "",
            "url": ""
        }
    };

    options.data.id = 1;
    if(localData.length>0) {
        options.data.id = localData[localData.length - 1].id + 1;
    }

    options.data.envid = parseInt($("#pipeline-add-envid").data("kendoDropDownList").value());
    options.data.envname = $("#pipeline-add-envid").data("kendoDropDownList").text();
    options.data.text = $("#pipeline-add-pipeline").data("kendoDropDownList").text();
    options.data.url = $("#pipeline-add-pipeline").data("kendoDropDownList").value();
    localData.push(options.data);
    window.localStorage[PIPELINEDATA] = JSON.stringify(localData);
    $("#pipelineListView").data("kendoMobileListView").dataSource.read();
    $("#pipeline-add-modalview").kendoMobileModalView("close");
}

function deleteEnv(id)
{
    var localData = getCurrentEnvironments();
    var pipelines = getPipeLines();

    for(var i=0; i<localData.length; i++){
        if(localData[i].id === id){
            localData.splice(i,1);
            var pipelineLength = pipelines.length-1;
            for(var j=pipelineLength; j>=0; j--){
                if(pipelines[j].envid === id){
                    pipelines.splice(j,1);
                }
            }
            break;
        }
    }
    window.localStorage[ENVIRONMENTDATA] = JSON.stringify(localData);
    window.localStorage[PIPELINEDATA] = JSON.stringify(pipelines);

}

function deletePipeline(id)
{
    var localData = getPipeLines();
    for(var i=0; i<localData.length; i++){
        if(localData[i].id === id){
            localData.splice(i,1);
            break;
        }
    }
    window.localStorage[PIPELINEDATA] = JSON.stringify(localData);

}


function saveEnvModalView() {
    var localData = getCurrentEnvironments();
    var options = {
        data: {
            "id": 1,
            "text": "",
            "url": "",
            "user": "",
            "pass": ""
        }
    };

    options.data.id = localData[localData.length-1].id + 1;
    options.data.text = $("#env-add-text").val();
    options.data.url = $("#env-add-url").val();
    options.data.user = $("#env-add-user").val();
    options.data.pass = $("#env-add-pass").val();
    localData.push(options.data);
    window.localStorage[ENVIRONMENTDATA] = JSON.stringify(localData);
    $("#envListView").data("kendoMobileListView").dataSource.read();
    $("#env-add-modalview").kendoMobileModalView("close");
}


function getCurrentEnvironments() {
    var currentEnvironments = jQuery.parseJSON(window.localStorage.getItem(ENVIRONMENTDATA));
    if (currentEnvironments == null || (currentEnvironments != null && currentEnvironments.length == 0)) {
        currentEnvironments = getDefaultEnvironments();
        window.localStorage.setItem(ENVIRONMENTDATA, JSON.stringify(currentEnvironments));
    }
    return currentEnvironments;

}

function envViewInit(e){
    var currentEnvironments = getCurrentEnvironments();


    e.view.element.find("#environmentCancel").data("kendoMobileBackButton").bind("click", function(e) {
        e.preventDefault();
        kendo.mobile.application.navigate("#");
    });


    e.view.element.find("#envListView").kendoMobileListView({
        dataSource: environmentsDataSource,
        template: $("#environment-template").html()
    }).kendoTouch({
        filter: ">li",
        enableSwipe: true,
        touchstart: touchstart,
        tap: envNavigate,
        swipe: swipe
    });

    $("#envListView").data("kendoMobileListView").dataSource.read();
}

function envNavigate(e) {
    console.log($(e.touch.target).data("uid"))
    var itemUID = $(e.touch.target).data("uid");
    kendo.mobile.application.navigate("#env-edit-detailview?uid=" + itemUID);
}

function swipe(e) {
    var button = kendo.fx($(e.touch.currentTarget).find("[data-role=button]"));
    button.expand().duration(30).play();
}

function touchstart(e) {

    var target = $(e.touch.initialTouch),
        listview = $("#envListView").data("kendoMobileListView"),
        model,
        button = $(e.touch.target).find("[data-role=button]:visible");

    if (target.closest("[data-role=button]")[0]) {
        var dataSource = listview.dataSource;

        model = dataSource.getByUid($(e.touch.target).attr("data-uid"));
        dataSource.remove(model);

        //prevent `swipe`
        this.events.cancel();
        e.event.stopPropagation();
    } else if (button[0]) {
        button.hide();

        //prevent `swipe`
        this.events.cancel();
    } else {
        listview.items().find("[data-role=button]:visible").hide();
    }
}

function envDetailShow(e) {
    var listview = $("#envListView").data("kendoMobileListView");
    var dataSource = listview.dataSource;

    var model = dataSource.getByUid(e.view.params.uid);

    $("#env-delete-button").data("kendoMobileButton").bind("click", function() {
        deleteEnv(model.id);
        dataSource.read();
        kendo.mobile.application.navigate("#environments.html");
    });


    kendo.bind(e.view.element, model, kendo.mobile.ui);
}

function envDetailInit(e) {
    var view = e.view;
    var listview = $("#envListView").data("kendoMobileListView");
    var dataSource = listview.dataSource;

    view.element.find("#done").data("kendoMobileButton").bind("click", function() {
        dataSource.one("change", function() {
            view.loader.hide();
            dataSource.read();
            kendo.mobile.application.navigate("#environments.html");
        });

        view.loader.show();
        dataSource.sync();
    });


    view.element.find("#envCancel").data("kendoMobileBackButton").bind("click", function(e) {
        e.preventDefault();
        dataSource.one("change", function() {
            view.loader.hide();
            kendo.mobile.application.navigate("#environments.html");
        });

        view.loader.show();
        dataSource.cancelChanges();
    });
}

var jobPoll;

function hideJobs(e)
{
    console.log('stop polling');
    clearInterval(jobPoll);
}


function showJobs(e)
{
    e.view.element.find("#pipeline-delete-button").data("kendoMobileButton").bind("click", function() {
        deletePipeline(parseInt(getParameterByName('pipelineid')));
        $("#pipelineListView").data("kendoMobileListView").dataSource.read();
        kendo.mobile.application.navigate("index");
    });
}

function showAddPipelineModal() {
    var el = $('#pipeline-add-modalview');
    el.data('kendoMobileModalView').open();
    $("#pipeline-add-envid").data("kendoDropDownList").dataSource.read();
    $("#pipeline-add-pipeline").data("kendoDropDownList").dataSource.read();
}

function initIndex(e) {
    $("#pipelineListView").data("kendoMobileListView").dataSource.read();
}

function initJobs(e)
{
    var request = getJobUrl();

    console.log(request.url);
    var jobsDataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: request.url,
                dataType: "json",
                cache: false,
                type: 'GET',
                beforeSend: function (xhr) {
                    doAuthBeforeSend(xhr, request.user, request.pass, request.envUrl)
                }
            }
        },
        error: function(e) {
            console.log("error");
            e.preventDefault();
            kendo.mobile.application.navigate("index");
        },
        schema: {
            model: {
                id: "id"
            }
        }
    });

    e.view.element.find("#jobListView").kendoMobileListView({
        dataSource: jobsDataSource,
        template: kendo.template($("#job-template").html())
    });


    e.view.element.find("#jobsCancel").data("kendoMobileBackButton").bind("click", function(e) {
        e.preventDefault();
        clearInterval(jobPoll);
        kendo.mobile.application.navigate("#");
    });

    jobPoll = setInterval(function(){ $("#jobListView").data("kendoMobileListView").dataSource.read()  }, 3000);

}

var buildDetailsPoll;

function hideBuildDetails()
{
    console.log('stop polling');
    clearInterval(buildDetailsPoll);
}


function initBuildDetails(e)
{
    var request = getBuildDetailUrl();
    var buildStatus = getParameterByName('status');

    console.log(request.url);

    var allEvents;
    var payLoads = [];
    if(buildStatus!='' && (buildStatus!='started' && buildStatus!='pending')) {
        e.view.element.find("#abort-build-button").hide();


        $.ajax
        ({
            type: "GET",
            url: request.url,
            async: false,
            beforeSend: function (xhr) {
                doAuthBeforeSend(xhr, request.user, request.pass, request.envUrl)
            },
            timeout: 3000, // sets timeout to 3 seconds
            success: function (result) {
                result = result.replace(/^\s+|\s+$/g, '');
                if (result.endsWith('data')) {
                    result = result + ': {"data":{}}';
                    result = result + '\n';
                }
                var jsonStr = ('[{' + result + '}]').replace(/\n\n/g, "}\n,\n{");
                jsonStr = jsonStr.replace(/id: \n/g, "id: 0\n");
                jsonStr = jsonStr.replace(/id:/g, "\"id\":");
                jsonStr = jsonStr.replace(/event: event/g, ",\"event\":\"event\"");
                jsonStr = jsonStr.replace(/event: end/g, ",\"event\":\"end\"");
                jsonStr = jsonStr.replace(/data:/g, ",\"data\":");

                allEvents = JSON.parse(jsonStr);


                for (var i = 0; i < allEvents.length; i++) {

                    if (typeof allEvents[i].data != "undefined") {
                        if (typeof allEvents[i].data.data != "undefined") {
                            if (typeof allEvents[i].data.data.payload != "undefined") {
                                var pload = {payload: allEvents[i].data.data.payload.toString()};
                                payLoads.push(pload);

                            }
                        }
                    }
                }

                var buildDetailsDataSource = new kendo.data.DataSource({
                    data: payLoads
                });
                e.view.element.find("#buildDetailsListView").kendoMobileListView({
                    dataSource: buildDetailsDataSource,
                    template: "#= payload #",
                    filterable: {
                        field: "payload",
                        operator: "contains"
                    }

                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus + "Error: " + errorThrown);
            }
        });
    }
    e.view.element.find("#abort-build-button").data("kendoMobileButton").bind("click", function(e) {
        e.preventDefault();
        abortBuild(e);
    });

    e.view.element.find("#buildDetailsCancel").data("kendoMobileBackButton").bind("click", function(e) {
        e.preventDefault();
        kendo.mobile.application.navigate("#builds.html?jobname="+getParameterByName('jobname')+"&pipelineid=" + getParameterByName('pipelineid'));
    });
}

function abortBuild(e)
{
    var request = getAbortUrl();
    if(request.pass!='') {
        $.ajax
        ({
            type: "POST",
            url: request.url,
            async: false,
            beforeSend: function (xhr) {
                doAuthBeforeSend(xhr, request.user, request.pass, request.envUrl)
            },
            success: function () {
                kendo.mobile.application.navigate("#builds.html?jobname="+getParameterByName('jobname')+"&pipelineid=" + getParameterByName('pipelineid'));
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus + "Error: " + errorThrown);
            }
        });
    }
    else
    {
        var notification = $("#abortNotification").kendoNotification({
            position: {
                pinned: true,
                top: 10,
                left: 10
            },
            autoHideAfter: 2000,
            stacking: "down",
            templates: [{
                type: "error",
                template: "<div class='wrong-credentials'><img src='img/error-icon.png' /><h3>#= title #</h3><p>#= message #</p></div>"
            }]}).data("kendoNotification");

        notification.show({
            title: "Not Authorized",
            message: "Please enter Credentials for this Environment."
        }, "error");
    }
}

var buildPoll;

function hideBuilds()
{
    console.log('stop polling');
    clearInterval(buildPoll);
}


function initBuilds(e)
{
    var request = getBuildUrl();

    console.log(request.url);
    var buildsDataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: request.url + '?limit=10',
                dataType: "json",
                type: 'GET',
                cache: false,
                beforeSend: function (xhr) {
                    doAuthBeforeSend(xhr, request.user, request.pass, request.envUrl)
                },
            }
        },
        schema: {
            model: {
                id: "id"
            },
            fields: {
                id: { type: "number" },
                name: { type: "string" },
                status: { type: "string" },
                job_name: { type: "string" },
                url: { type: "string" },
                api_url: { type: "string" },
                pipeline_name: { type: "string" },
                start_time: { type: "number" },
                end_time: { type: "number" },
            }
        }
    });

    e.view.element.find("#buildListView").kendoMobileListView({
        dataSource: buildsDataSource,
        template: kendo.template($("#build-template").html())
    });

    e.view.element.find("#buildsCancel").data("kendoMobileBackButton").bind("click", function(e) {
        e.preventDefault();
        clearInterval(buildPoll);
        kendo.mobile.application.navigate("#jobs.html?pipelineid=" + getParameterByName('pipelineid'));
    });

    buildPoll = setInterval(function(){ $("#buildListView").data("kendoMobileListView").dataSource.read()  }, 3000);

}

function triggerBuild()
{
    var request = getTriggerUrl();
    if(request.pass!='') {
        $.ajax({
            type: 'POST',
            async: false,
            url: request.url,
            beforeSend: function(xhr) {
                doAuthBeforeSend(xhr, request.user, request.pass, request.envUrl, true);
            },
            success: function(data, textStatus, request){
                console.log('sucessfully Triggered a Build');
            }
        });


        $("#buildListView").data("kendoMobileListView").dataSource.read();
        kendo.mobile.application.navigate("#jobs.html?pipelineid=" + getParameterByName('pipelineid'));

    }
    else
    {
        var notification = $("#triggerNotification").kendoNotification({
            position: {
                pinned: true,
                top: 10,
                left: 10
            },
            autoHideAfter: 2000,
            stacking: "down",
            templates: [{
                type: "error",
                template: "<div class='wrong-credentials'><img src='img/error-icon.png' /><h3>#= title #</h3><p>#= message #</p></div>"
            }]}).data("kendoNotification");

        notification.show({
            title: "Not Authorized",
            message: "Please enter Credentials for this Environment."
        }, "error");

    }
}


var environmentsDataSource = new kendo.data.DataSource({
    transport: {
        create: function(options){
            var localData = JSON.parse(window.localStorage[ENVIRONMENTDATA]);
            options.data.id = localData[localData.length-1].id + 1;
            localData.push(options.data);
            window.localStorage[ENVIRONMENTDATA] = JSON.stringify(localData);
            options.success(options.data);
        },
        read: function(options){
            var localData = getCurrentEnvironments();
            options.success(localData);
        },
        update: function(options){
            var localData = JSON.parse(window.localStorage[ENVIRONMENTDATA]);

            for(var i=0; i<localData.length; i++){
                if(localData[i].id == options.data.id){
                    localData[i].text = options.data.text;
                    localData[i].url = options.data.url;
                    localData[i].user = options.data.user;
                    localData[i].pass = options.data.pass;
                }
            }
            window.localStorage[ENVIRONMENTDATA] = JSON.stringify(localData);
            options.success(options.data);
        },
        destroy: function(options){
            var localData = JSON.parse(localStorage[ENVIRONMENTDATA]);
            for(var i=0; i<localData.length; i++){
                if(localData[i].ID === options.data.ID){
                    localData.splice(i,1);
                    break;
                }
            }
            localStorage[ENVIRONMENTDATA] = JSON.stringify(localData);
            options.success(localData);
        },
    },
    schema: {
        model: {
            id: "id"
        }
    }
});

var pipelinesDataSource = new kendo.data.DataSource({
    transport: {
        read: function(options){
            var localData = getPipeLines();
            options.success(localData);
        },
    },
    schema: {
        model: {
            id: "id"
        }
    },
    group: { field: "envname" }
});

function doAuthBeforeSend(xhr, user, pass, envUrl) {
    getAuthBeforeSend(xhr, user, pass, envUrl, true);
}

function getAuthBeforeSend(xhr, user, pass, envUrl, requestToken) {
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
    if (requestToken) {
        if (pass != '') {
            console.log('doAuthBeforeSend Trigger');
            console.log(btoa(user + ":" + pass));
            xhr.setRequestHeader("Authorization", getAuthToken(user, pass, envUrl))
        }
    }
}


function getAuthToken(user, pass, envUrl) {
    var authToken = "";

    $.ajax({
        type: 'GET',
        async: false,
        url: envUrl + '/api/v1/teams/main/auth/token',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(user + ":" + pass));
        },
        success: function(data, textStatus, request){
            authToken = data.type+" "+data.value;
        }
    });
    console.log('Auth Token: ' + authToken);

    return authToken;

}


function getCookie(cookieName, cookieString){
    var cookieArray = cookieString;
    for(var i=0; i<cookieArray.length; i++){
        var cookie = cookieArray[i];
        while (cookie.charAt(0)==' '){
            cookie = cookie.substring(1);
        }
        cookieHalves = cookie.split('=');
        if(cookieHalves[0]== cookieName){
            return cookieHalves[1];
        }
    }
    return "";
}