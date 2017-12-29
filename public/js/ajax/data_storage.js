$(document).ready(function() {
    $.ajaxSetup({

        headers: {

            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')

        }

    });
    //Add user
    $('#add-user').click(function (e) {
            e.preventDefault();

            var name = $("input[name=name]").val();
            var surname = $("input[name=surname]").val();
            var age = $("input[name=age]").val();
            console.log(name);
            console.log(surname);
            console.log(+age);

                if(name == '' || surname == '' || age == '' || isNaN(age))
                {
                    if(isNaN(age))
                    {
                        alert("Field 'Age' must be a number beetween 18 and 99");
                    }
                    else
                        alert("Fill in all the fields");
                }


            else {
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: '/create_ajax',
                    data: {'name': name, 'surname': surname, 'age': age},
                    success: function (data) {
                        alert(data.msg);
                        $('#ajax-data table tbody').empty();
                        for (var i = 0; i < data.users.length; i++) {
                            $('#ajax-data table tbody').append(
                                "<tr>\n" +
                                "<th scope='row'>" + data.users[i].id + "</th>\n" +
                                "<td>" + data.users[i].name + "</td>\n" +
                                "<td>" + data.users[i].surname + "</td>\n" +
                                "<td>" + data.users[i].age + "</td>\n" +
                                "<td>" + data.users[i].created_at + "</td>\n" +
                                "</tr>"
                            )
                        }
                        ;
                    },
                    error: function () {
                        alert('Sorry, something went wrong');
                    }
                });
            }
        }
    );
});