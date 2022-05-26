$(function(){
    /*==============================================

    main-visualスライドショー

    ==============================================*/
    // スライドの現在値と最終スライド番号を変数化
    // スライド現在値（1枚目のスライド番号としての意味も含む）
    let slideCurrent = 0; 
    // スライドの合計数＝最後のスライド番号
    let lastCurrent = $('.js-slideshow').length - 1;
    // 一旦すべてのスライドを非表示
    $('.js-slideshow').css('display', 'none');
    // 最初のスライドを表示
    $('.js-slideshow').eq(slideCurrent).css('display', 'block');

    /*==============================================
    画像のフェードアウトフェードインを行う関数
    ==============================================*/
    // スライドの切り替わりを「changeslide」として定義(ボタンで取得したスライド番号で変化させる)
    function changeslide() {
        // 現在のスライドをフェードアウトさせる
        $('.js-slideshow').fadeOut(1000);
        // 次のスライドを表示させる
        $('.js-slideshow').eq(slideCurrent).fadeIn(1500);
        
    };
    /*==============================================
    一定時間毎に処理実行を行う関数
    ==============================================*/
    // 自動スライド切り替えのタイマーを設定
    function startTimer() {
        // setInterval・・・指定した時間ごとに関数を実行
        Timer = setInterval(function () {
        // 現在のスライドが最終スライドの場合
        if (slideCurrent === lastCurrent) {
            // スライド初期値の値を代入して関数実行（初めのスライドに戻す）
            slideCurrent = 0;
            changeslide();
        } else {
            slideCurrent++;
            changeslide(); // そうでなければスライド番号を増やして（次のスライドに切り替え）関数実行
        };
        }, 3000); // 上記動作を3秒毎に
    }
    //自動スライド切り替えタイマーを発動
    startTimer();

    /*==============================================

    ハンバーガーメニュー

    ==============================================*/
    $(".header__navi-btn").on("click", function(){
        // spメニューの位置を設定
        let rightVal = 0;
        //クリックしたボタンが閉じていたら
        if($(this).hasClass("header__navi-btn--cross")) {
            // 位置を移動させメニューを開いた状態にする
            rightVal = -767;
            // メニューを開いたら次回クリック時は閉じた状態になるよう設定
            $(this).removeClass("header__navi-btn--cross");
        } else {
            // メニューを開いたら次回クリック時は閉じた状態になるよう設定
            $(this).addClass("header__navi-btn--cross");
        }
        //ハンバーガーボタンクリックでアニメーションを
        //途中ストップ
        $(".js-slide-in-out").stop().animate({
            //動かす距離
            //0または-767が入る
            right: rightVal
        }, 600);
    });

    /*==============================================

    ページトップボタン

    ==============================================*/
    let pagetop = $(".js-return-top");
    //ページトップボタンを非表示
    pagetop.hide();
    //500px以上スクロールした時ボタンを表示　500以下の場合非表示
    $(window).scroll(function(){
        if($(this).scrollTop() > 500){
            pagetop.fadeIn();
        } else {
            pagetop.fadeOut();
        }
    });
    //ページ最上部まで0.5秒で移動
    pagetop.click(function(){
        $("body, html").animate({
            scrollTop: 0
        }, 500);
        //イベントが親要素に伝搬するのを制御
        return false;
    });

    /*==============================================

    ページジャンプ
    
    ==============================================*/
    //#で始まるa要素をクリック
    $('a[href^="#"]').click(function(){

        /*==============================================
        レスポンシブ時の動き
        ==============================================*/
        //メニューリンククリックでもメニューバーを閉じる
        //クリックした時ハンバーガーメニューバーがクロスクラスを持っていたら(メニューが開いていたら)
        if($(".header__navi-btn").hasClass("header__navi-btn--cross")){
            //メニュー移動位置
            let rightVal = -767;
            // ハンバーガーメニューのクロス状態を解除
            $(".header__navi-btn").removeClass("header__navi-btn--cross");
            $(".js-slide-in-out").animate({
                //動かす距離
                right: rightVal
            }, 600);
        }

        let adjust = 0;
        //スクロールのスピード
        let speed = 1000;
        //リンク先値を取得
        let href = $(this).attr("href");
        //移動先を取得
        let target = $(href == "#" || href == "" ? 'html' : href);
        //移動先の位置を取得して変数adjustで位置調整
        let position = target.offset().top + adjust;
        //設定した位置と速度で移動させる
        $('body,html').animate({scrollTop:position}, speed, 'swing');

        //イベントが親要素に伝搬するのを制御
        return false;

    });
});