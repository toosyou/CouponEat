toastr.options.timeOut = 1000;
current_page = '';
coupon_url = {
    'foodpanda': 'https://www.callingtaiwan.com.tw/foodpanda-coupon-code/#%E5%84%AA%E6%83%A0%E5%88%97%E8%A1%A8',
    'ubereats': 'https://www.callingtaiwan.com.tw/ubereats%E5%84%AA%E6%83%A0-%E6%9C%80%E6%96%B0%E9%A4%90%E5%BB%B3%E5%A4%96%E9%80%81%E9%A6%96%E8%B3%BC%E5%84%AA%E6%83%A0%E5%BA%8F%E8%99%9F-%E6%8A%98%E6%89%A3%E7%A2%BC-%E6%8E%A8%E8%96%A6%E7%A2%BC/'
}

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url.replace(/^https?:\/\//, '').replace('www.', '');
    current_page = url.split('.')[0];

    // check if current page is in the list
    if (!coupon_url[current_page]) {
        // cannot find the corresponding coupons
        document.getElementById('loading').style.display = 'none';
        document.getElementsByClassName('error-div')[0].hidden=false;

        document.body.style.width = '300px';
        document.getElementsByTagName("html")[0].style.width = "300px";

        document.body.style['min-height'] = '380px';
        document.getElementsByTagName("html")[0].style['min-height'] = "380px";
    }
    else{
        $.ajax({ 
            url: coupon_url[current_page],
            success: function(data) { 
                var coupons = [];
                whole_page = $.parseHTML(data);
        
                $('#coupon_table tr', whole_page).each(function() {
                    row = [];
                    $('td', this).each(function(index) {
                        if(index == 1) text = $(this).html();
                        else text = $(this).text();
        
                        text = text.replace('(點擊折扣碼可複製)', '');
                        text = text.replace('，不一定每個人都可用', '');
                        text = text.trim();
                        row.push(text);
                    });
                    if( !row[2].includes('前往訂餐') && !row[2].includes('成為會員'))
                        coupons.push(row);
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
                        toastr.success('優惠碼已複製到剪貼板');
                    });
                    table.appendChild(tr);
                }
        
                // document.getElementById('loading').style.display = 'none';
                $('#loading').hide();
                $('.warp-table100').show();
                //document.getElementsByClassName('warp-table100')[0].hidden=false;

                $('#' + current_page + '-table-logo').show();
            }
        });
    }
});