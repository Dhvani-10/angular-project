function checkblank(cnt,lbl)
{
    var data = cnt.value.trim();

    if(data.length == 0)
    {
        lbl.innerHTML = "This field cannot be blank";
    }
    else
    {
        lbl.innerHTML = "";
    }
}

function onlyalpha(cnt,lbl)
{
    var data = cnt.value;
    var ptrn = /^[A-Za-z ]+$/;

    if(data != "" && !ptrn.test(data))
    {
        lbl.innerHTML = "Only alphabets allowed";
    }
    else
    {
        lbl.innerHTML = "";
    }
}

function checkpassword(cnt,lbl)
{
    var data = cnt.value;

    if(data.length < 6)
    {
        lbl.innerHTML = "Password must be minimum 6 characters";
    }
    else
    {
        lbl.innerHTML = "";
    }
}

function checkemail(cnt,lbl)
{
    var ptrn=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(!ptrn.test(cnt.value))
    {
        lbl.innerHTML="Invalid Email Format";
    }
    else
    {
        lbl.innerHTML="";
    }
}

function checkmobileno(cnt,lbl)
{
    var ptrn=/^\d{10}$/;

    if(!ptrn.test(cnt.value))
    {
        lbl.innerHTML="Mobile number must be exactly 10 digits";
    }
    else
    {
        lbl.innerHTML="";
    }
}

function checkaadhaar(cnt,lbl)
{
    var value = cnt.value.replace(/\D/g,'');

    if(value.length > 12)
        value = value.substring(0,12);

    var formatted = value.match(/.{1,4}/g);
    cnt.value = formatted ? formatted.join('-') : value;

    var ptrn = /^\d{4}-\d{4}-\d{4}$/;

    if(!ptrn.test(cnt.value))
    {
        lbl.innerHTML = "Aadhaar must be 12 digits (1234-5678-9012)";
    }
    else
    {
        lbl.innerHTML = "";
    }
}

function checkdob(cnt,lbl)
{
    var selected = new Date(cnt.value);
    var today = new Date();

    today.setHours(0,0,0,0);

    if(selected >= today)
    {
        lbl.innerHTML = "Date of Birth must be past date only";
    }
    else
    {
        lbl.innerHTML = "";
    }
}
