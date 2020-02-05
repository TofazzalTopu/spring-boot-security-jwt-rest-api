/**
 * Created by hoshen.mahmud on 29-Oct-15.
 */
//==============================================================================================================================
//                                                            Spinner
//------------------------------------------------------------------------------------------------------------------------------
$(window).load(function () {
    $(".spinner").fadeOut("slow");
})
//------------------------------------------------------------------------------------------------------------------------------
//jQuery(document).ready(function () {

//==================================================================================================================================
//  Spinner Icon (Window.onLoad(), AJAX Request fire)
//----------------------------------------------------------------------------------------------------------------------------------
//    $(window).load(function () {/*$(".spinner").fadeIn("slow");*/ $(".spinner").fadeOut("slow");});
//    $(window).load(function () { Pace.restart();});

//$(document).ajaxStart(function() { Pace.restart(); }).ajaxStop(function () {Pace.stop();});

$(document).ajaxStart(function () {
    /*$(".spinner").fadeIn("slow");*/
    //alert('ajax start...');
    $(".spinner").fadeOut("slow");
}).ajaxStop(function () {
    $(".spinner").fadeOut("slow");
    //alert('ajax stop...');
});
//==================================================================================================================================

var totalWidth, availableWidth, totalHeight, availableHeight, colorDepth, colorResolution;
var headerHeight, footerHeight;

jQuery(document).ready(function () {
    totalWidth = screen.width;
    availableWidth = screen.availWidth;
    totalHeight = screen.height;
    availableHeight = screen.availHeight;
    colorDepth = screen.colorDepth;
    colorResolution = screen.pixelDepth;
    headerHeight = $('.header').height();
    footerHeight = $('.footer').height();
    //contextPath = contextPath;

    //$('body').height(availableHeight - headerHeight - footerHeight);
    $('body').height(availableHeight - 248);
    //$('body').attr({style: 'height: 800px'});
    //$('body').css({height: '800px'});
//------------------------------------------------------------------------------------------------------------------------------
//                                  DataTable (Do not delete anything || Under construction)
//------------------------------------------------------------------------------------------------------------------------------
    $("#example").dataTable({
//------------------------------------------------------------------------------------------------------------------------------
//          Checked
//------------------------------------------------------------------------------------------------------------------------------
        order: [0, "asc"],                        //"asc" & "desc"
        ordering: true,
        paging: true,
        lengthChange: true,
        searching: true,
        info: true,
        scrollY: true,                               //400
        scrollX: true,                               //400
//------------------------------------------------------------------------------------------------------------------------------
        lengthMenu: [
            [5, 10, 15, 25, 50, 100, -1],
            [5, 10, 15, 25, 50, 100, "All"]
        ],
        "iDisplayLength": 50,
        responsive: true                               //For Responsive dataTable. (http://www.datatables.net/extensions/responsive/)
//------------------------------------------------------------------------------------------------------------------------------
//            ajax             : data_sample,                        //For Generating Data      : data source path.
//------------------------------------------------------------------------------------------------------------------------------
//            "dom"            : 'T<"clear">lfrtip',                 //https://www.datatables.net/extensions/tabletools/
//            tableTools       : {"sSwfPath": sSwfPath},             //For Printing (dataTable) : swf file path
//------------------------------------------------------------------------------------------------------------------------------
//          Not Yet Checked
//------------------------------------------------------------------------------------------------------------------------------
        //pageLength: 50
        //"bPaginate": false,
        //"sPaginationType": "full_numbers",
        //"sPaginationType": "scrolling",
        //"sPaginationType": "listbox",
        //"sPaginationType": "four_button",
        //rowReorder: true,
        //colReorder: true,
        //autoFill: true,
        //keys: true,
        //select: true,           //http://www.datatables.net/extensions/select/
        //fixedHeader: true,
        //ajax:           '/api/data',
        //deferRender: true,
        //scroller: true,

        //"pagingType": "scrolling"   //http://www.datatables.net/plug-ins/pagination/
    });

    $(".dt-default").dataTable({

    });
//------------------------------------------------------------------------------------------------------------------------------
//            select           : true,
//            "dom"            : '<"top"lf>t<"bottom"pi><"clear">',
//------------------------------------------------------------------------------------------------------------------------------

    //Changing:	https://datatables.net/manual/api
    //var table = $('#example').DataTable();
    //table.search( 'Fiona' ).draw();

    /*var table = $('#myTable').DataTable();
     new $.fn.dataTable.KeyTable(table, {
     //options      //http://www.datatables.net/extensions/keytable/
     });
     */

    //var table = $('#myTable').DataTable();
    //new $.fn.dataTable.FixedHeader( table, {
    //  options
    //} );

    //var table = $('#myTable').DataTable();
    //new $.fn.dataTable.FixedColumns( table, {
    //options      //http://www.datatables.net/extensions/fixedcolumns/
    //} );

    $(".date").datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: '1950:+10',
            defaultDate: '+0y',
            dateFormat: 'dd/mm/yy'
        }
    ).prop('placeholder', 'DD/MM/YYYY');
});
//------------------------------------------------------------------------------------------------------------------------------
//$(document).on('focus', ".form_date", function () {
//    $(this).datetimepicker({
//        language: 'en',
//        weekStart: 1,
//        todayBtn: 1,
//        autoclose: 1,
//        todayHighlight: 1,
//        startView: 2,
//        minView: 2,
//        forceParse: 0
//    });
//});
