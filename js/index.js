$(function() {
    $('.sanpham-hot').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: '<span class="priv_arrow"><button type="button" class="btn btn-light"><i class="fa fa-chevron-left" aria-hidden="true"></button></i></span>',
        nextArrow: '<span class="next_arrow"><button type="button" class="btn btn-light"><i class="fa fa-chevron-right" aria-hidden="true"></button></i></span>',

    });

    $('.nav-dangnhap').on('click', function() {
        $("#testModal").modal();
    });
    $('.carousel').carousel({
        interval: 2000
    })
});

function increaseSize(el) {
    $(el).css("position", "relative");
    $(el).css("top", -10);
}

function decreaseSize(el) {
    $(el).css("position", "relative");
    $(el).css("top", 0);
}

function dangky() {
    var loi1 = kiemTraLoiTenHienThi();
    hienThiLoi("#txt-dangky-hienthi", "#txt-dangky-hienthi-thongbao", loi1);

    loi2 = kiemTraLoiEmail();
    hienThiLoi("#txt-dangky-email", "#txt-dangky-email-thongbao", loi2);

    loi3 = kiemTraLoiMatKhau();
    hienThiLoi("#txt-dangky-matkhau", "#txt-dangky-matkhau-thongbao", loi3);

    loi4 = kiemTraLoiMatKhauNhacLai();
    hienThiLoi("#txt-dangky-matkhaunhaclai", "#txt-dangky-matkhaunhaclai-thongbao", loi4);

    if (loi1 == "" && loi2 == "" && loi3 == "" && loi4 == "") {
        var tenHienThi = $("#txt-dangky-hienthi").val();
        var email = $("#txt-dangky-email").val();
        var password = $("#txt-dangky-matkhau").val();

        sessionStorage.setItem("email", email);
        sessionStorage.setItem("password", password);
        sessionStorage.setItem("tenHienThi", tenHienThi);
        thongbao("Đăng ký thành công!", clearDangKy);
    }
}

function dangnhap() {
    sessionStorage.removeItem("dangNhapThanhCong", false);

    var emailDaNhap = $("#txt-email-dangnhap").val();
    var passwordDaNhap = $("#txt-password-dangnhap").val();

    var email = sessionStorage.getItem("email");
    var password = sessionStorage.getItem("password");

    if (email == null || email == "" || password == null || password == "") {
        thongbao("Vui lòng đăng ký trước khi đăng nhập!");
        return;
    }

    if (email == emailDaNhap && password == passwordDaNhap && emailDaNhap != "" && passwordDaNhap != "") {
        thongbao("Đăng nhập thành công!", function() {
            $("#txt-dangnhap-email").val("");
            $("#txt-dangnhap-password").val("");
            $('#modal-dangnhap').modal('hide');
        });

        sessionStorage.setItem("dangNhapThanhCong", true);
    } else {
        thongbao("Đăng nhập thất bại!");
    }
}

function thongbao(noidung, callback) {
    $("#thongbao").text(noidung);
    $('#modal-thongbao').modal('show');

    if (callback)
        callback();
}


function kiemTraLoiTenHienThi() {
    var loi = "";

    var tenHienThi = $("#txt-dangky-hienthi");

    if (tenHienThi.val() == "")
        loi = "Tên hiển thị không được rỗng";
    else if (tenHienThi.val().length >= 20)
        loi = "Tên hiển thị không được dài quá 20 ký tự";
    else if (tenHienThi.val().length < 5)
        loi = "Tên hiển thị phải dài ít nhất 5 ký tự";

    return loi;
}

function kiemTraLoiEmail() {
    var loi = "";

    var email = $("#txt-dangky-email");

    if (email.val() == "")
        loi = "Email không được rỗng";
    else if (email.val().length < 5)
        loi = "Email phải dài ít nhất 5 ký tự";
    else if (isEmailError(email.val()))
        loi = "Email không đúng định dạng";
    return loi;
}

function kiemTraLoiMatKhau() {
    var loi = "";

    var matKhau = $("#txt-dangky-matkhau");

    if (matKhau.val() == "")
        loi = "Mật khẩu không được rỗng";
    else if (matKhau.val().length >= 20)
        loi = "Mật khẩu không được dài quá 20 ký tự";
    else if (matKhau.val().length < 5)
        loi = "Mật khẩu phải dài ít nhất 5 ký tự";

    return loi;
}

function kiemTraLoiMatKhauNhacLai() {
    var loi = "";

    var matKhau = $("#txt-dangky-matkhau");
    var matKhauNhacLai = $("#txt-dangky-matkhaunhaclai");

    if (matKhau.val() != matKhauNhacLai.val())
        loi = "Mật khẩu không khớp";
    else if (matKhau.val() == "")
        loi = "Mật khẩu nhắc lại không được rỗng";
    return loi;


}

function isEmailError(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return false;
    }

    return true;
}


function hienThiLoi(tenTruong, tenTruongThongBao, loi) {
    var truong = $(tenTruong);
    var thongbao = $(tenTruongThongBao);

    if (loi == "") {
        truong.addClass("is-valid");
        truong.removeClass("is-invalid");
        thongbao.addClass("valid-feedback")
        thongbao.removeClass("invalid-feedback")
        thongbao.text("");
    } else {
        truong.addClass("is-invalid");
        truong.removeClass("is-valid");
        thongbao.addClass("invalid-feedback")
        thongbao.removeClass("valid-feedback")
        thongbao.text(loi);
    }
}

function clearDangKy() {
    $("#txt-dangky-hienthi").val("");
    $("#txt-dangky-email").val("");
    $("#txt-dangky-matkhau").val("");
    $("#txt-dangky-matkhaunhaclai").val("");

    $('#modal-dangky').modal('hide');
}

var yesFunction;
var noFunction;

function xacNhan(noidung, yesCallback, noCallback) {

    yesFunction = yesCallback;
    noFunction = noCallback;
    $('#xacnhan').text(noidung);
    $('#modal-xacnhan').modal('show');
}

function muaHang() {
    console.log("CALLING FUNCTION MUAHANG");
    console.log(sessionStorage.getItem("dangNhapThanhCong"));
    console.log(sessionStorage.getItem("dangNhapThanhCong") != null);
    console.log(sessionStorage.getItem("dangNhapThanhCong") != null && sessionStorage.getItem("dangNhapThanhCong") == true);

    var thanhcong = sessionStorage.getItem("dangNhapThanhCong");


    if (thanhcong != null && thanhcong === "true") {
        console.log("THIS IS CALL WHEN TRUE");
        xacNhan("Bạn muốn thanh toán?", function() {
            thongbao("Mua hàng thành công!");

        }, function() {

        });
    } else {
        console.log("THIS IS CALL WHEN FALSE");
        $("#exampleModalCenter").modal("show");
    }

}