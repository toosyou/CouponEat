toastr.options = {
    'timeOut': 1000,
};

$.ajax({ 
    url: 'https://www.callingtaiwan.com.tw/foodpanda-coupon-code/#%E5%84%AA%E6%83%A0%E5%88%97%E8%A1%A8', 
    success: function(data) { 
        var coupons = [];
        whole_page = $.parseHTML(data);

        $('#coupon_table tr', whole_page).each(function() {
            row = [];
            $('td', this).each(function(index) {
                if(index == 1) text = $(this).html();
                else text = $(this).text();

                text = text.replace('(�I���馩�X�i�ƻs)', '');
                text = text.replace('�A���@�w�C�ӤH���i��', '');
                text = text.trim();
                row.push(text);
            });
            if(row[2] == '�e���q�\ >>');
            else coupons.push(row);
        });
        coupons.shift();

        var table = document.getElementById('coupoon_tbbody');
        for (let i = 0; i < coupons.length; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < 3; j++) {
                const td = document.createElement('td');
                td.className = 'column' + (j+1);
                // td.appendChild(document.createTextNode(coupons[i][j]));
                td.innerHTML = coupons[i][j];
                tr.appendChild(td);
            }
            tr.addEventListener('click', function (e) {
                navigator.clipboard.writeText(coupons[i][2]);
                toastr.success('�u�f�X�w�ƻs��ŶK�O');
            });
            table.appendChild(tr);
        }

        document.getElementById('loading').style.display = 'none';
        document.getElementsByClassName("warp-table100")[0].hidden=false;
    }}
);