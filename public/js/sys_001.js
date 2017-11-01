
/***
 * 1 : CREATE
 * 2 : UPDATE
 * **/
var mode = 1;

const onClickBtnSave = () => {

	if(mode === 2)
	{
		//Update Case
		var txtUsrNm = document.getElementsByName('txtUsrNm')[0].value
		var txtPsw = document.getElementsByName('txtPsw')[0].value	
		var txtEmail = document.getElementsByName('txtEmail')[0].value

		$.ajax({
			type: "PUT",
			url: '/sys_001',
			dataType: 'json',
			data: {txtUsrNm:txtUsrNm,txtPsw:txtPsw,txtEmail:txtEmail},
			success: function (result) {

				swal({
					title : result.msg,
					type : 'success'
				})

				$('#btnSave').html('<strong>Save</strong>')
				mode = 1;

				var idElement = 'local'+result.localElement

				//set value into grid
				document.getElementById(idElement).childNodes[1].innerHTML = document.getElementsByName('txtUsrNm')[0].value
				document.getElementById(idElement).childNodes[2].innerHTML = document.getElementsByName('txtEmail')[0].value
				document.getElementById(idElement).childNodes[3].setAttribute("att-email", document.getElementsByName('txtEmail')[0].value);
				document.getElementById(idElement).childNodes[3].setAttribute("att-name", document.getElementsByName('txtUsrNm')[0].value);

				resetField();
				document.getElementsByName('txtEmail')[0].disabled = false;
				document.getElementById('btnCancel').style.visibility = 'hidden'
				toggleAction(false);
				
			}
		});	

	}else {
		//Insert Case
		var txtUsrNm = document.getElementsByName('txtUsrNm')[0].value
		var txtPsw = document.getElementsByName('txtPsw')[0].value	
		var txtEmail = document.getElementsByName('txtEmail')[0].value

		$.ajax({
			type: "POST",
			url: '/sys_001',
			dataType: 'json',
			data: {txtUsrNm:txtUsrNm,txtPsw:txtPsw,txtEmail:txtEmail},
			success: function (result) {
				swal({
					title : result.msg,
					type : 'success'
				})
				
				$('#table-user').children().append(result.newRow)

				resetField();
			},
			error: function(result){
				console.log(result);
			}
		});	
	}
}

const resetField = () => {
		document.getElementsByName('txtUsrNm')[0].value = "";
		document.getElementsByName('txtPsw')[0].value = "";
		document.getElementsByName('txtEmail')[0].value = "@gmail.com";
}

const toggleAction=(switchBT)=>{
	$('.btn-primary').attr("disabled", switchBT);
	$('.btn-danger').attr("disabled", switchBT);
}


const btnEdit = (e) => {
	if(mode == 1)
	{
		$('#btnSave').html('<strong>Update</strong>')
		mode = 2;
		//Disable UserId
		document.getElementsByName('txtEmail')[0].disabled = true;

		const email = e.parentNode.getAttribute('att-email')
		const name = e.parentNode.getAttribute('att-name')
		document.getElementsByName('txtUsrNm')[0].value = name;
		document.getElementsByName('txtEmail')[0].value = email;

		toggleAction(true);

		document.getElementById('btnCancel').style.visibility = 'visible'
	}
	
}

const onClickBtnCancelUpdate = () => {
	mode = 1;
	$('#btnSave').html('<strong>Save</strong>')
	document.getElementById('btnCancel').style.visibility = 'hidden'
	document.getElementsByName('txtEmail')[0].disabled = false
	toggleAction(false)
	resetField()
}

const btnDelete = (e) => {

	swal({
		title: 'Do you want to delete',
		type: 'question',
		showCancelButton: true,
		}).then(function () {
			const usrEml = e.parentNode.getAttribute('att-email')

			$.ajax({
				type: "DELETE",
				url: '/sys_001',
				dataType: 'json',
				data: {usrEml:usrEml},
				success: function (result) {
					var idElement = 'local'+result.localElement
					document.getElementById(idElement).remove()
					resetField();

					swal({
						title: 'Successfull',
						type: 'success'})
				},
				error: function(result){
					console.log(result);
				}
			});	
		})


}



$( document ).ready(function() {
    $('#btnReset').click(function() {
		$.ajax({
			type: "DELETE",
			url: '/score',
			dataType: 'json',
			success: function (result) {
				console.log(result);
			},
			error: function(result){
				console.log(result);
			}
		});	
	});
});