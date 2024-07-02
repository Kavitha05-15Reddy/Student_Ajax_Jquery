$(document).ready(function () {
    ShowStudentData();
});

function ShowStudentData() {
    $.ajax({
        url: '/Ajax/StudentList',
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',
        success: function (result, status, xhr) {
            var object = '';
            $.each(result, function (index, item) {
                object += '<tr>';
                object += '<td>' + item.id + '</td>';
                object += '<td>' + item.name + '</td>';
                object += '<td>' + item.email + '</td>';
                object += '<td>' + item.mobileNo + '</td>';
                object += '<td>' + item.city + '</td>';
                object += '<td>' + item.state + '</td>';
                object += '<td>' + item.country + '</td>';
                object += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + item.id + ')">Edit</a> || <a href="#" class="btn btn-danger" onclick="Delete(' + item.id + ')">Delete</a> </td>';
                object += '<tr>';
            });
            $('#table_data').html(object);
        },
        error: function () {
            alert("Data can't Retrieved..");
        }
    });
};

$('#btnAddStudent').click(function () {
    ClearTextBox();
    $('#StudentModal').modal('show');
    $('#empId').hide();
    $('#btnSave').css('display', 'block');
    $('#btnUpdate').css('display', 'none');
    $('#studentHeading').text('Add Student');
});

$('#btnClose1').click(function () {
    $('#StudentModal').modal('hide');
})

$('#btnClose2').click(function () {
    $('#StudentModal').modal('hide');
})

function HideModalPopUp() {
    $('#StudentModal').modal('hide');
}

function ClearTextBox() {
    $('#Name').val(''),
    $('#Email').val(''),
    $('#MobileNo').val(''),
    $('#City').val(''),
    $('#State').val(''),
    $('#Country').val('')
}

function AddStudent() {
    var objdata = {
        Name: $('#Name').val(),
        Email: $('#Email').val(),
        MobileNo: $('#MobileNo').val(),
        City: $('#City').val(),
        State: $('#State').val(),
        Country: $('#Country').val()
    };
    $.ajax({
        url: '/Ajax/AddStudent',
        type: 'Post',
        data: objdata,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert('Data Saved');
            ClearTextBox();
            ShowStudentData();
            HideModalPopUp();
        },
        error: function () {
            alert("Data can't Saved");
        }
    });
}

function Delete(id) {
    if (confirm('Are you sure, You want to delete this record?')) {
        $.ajax({
            url: '/Ajax/Delete?id=' + id,
            success: function () {
                alert('Data Deleted!');
                ShowStudentData();
            },
            error: function () {
                alert("Data can't be Deleted");
            }
        })
    }
}

function Edit(id) {
    $.ajax({
        url: '/Ajax/Edit?id=' + id,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            $('#StudentModal').modal('show');

            $('#Id').val(response.id)
            $('#Name').val(response.name),
            $('#Email').val(response.email),
            $('#MobileNo').val(response.mobileNo),
            $('#City').val(response.city),
            $('#State').val(response.state),
            $('#Country').val(response.country);

            $('#btnSave').css('display', 'none');
            $('#btnUpdate').css('display', 'block');
            $('#studentHeading').text('Update Student');

            //$('#btnSave').hide();
            //$('#btnUpdate').show();
        },
        error: function () {
            alert('Data not found');
        }
    })
}

function UpdateStudent() {
    var objdata = {
        Id: $('#Id').val(),
        Name: $('#Name').val(),
        Email: $('#Email').val(),
        MobileNo: $('#MobileNo').val(),
        City: $('#City').val(),
        State: $('#State').val(),
        Country: $('#Country').val()
    };
    $.ajax({
        url: '/Ajax/Update',
        type: 'Post',
        data: objdata,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert('Data Updated');
            ClearTextBox();
            ShowStudentData();
            HideModalPopUp();
        },
        error: function () {
            alert("Data can't Updated");
        }
    })
}