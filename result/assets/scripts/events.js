import dbController from"db-controller";const events={start:function(){const n=["home","posts/1","","portfolio","contact","login","register","profile"],e=window.location.href.split("#/")[1];n.forEach((n,o)=>{e===n?($(".nav.navbar-nav").children().eq(o).addClass("active"),$(".nav.nav-pills").children().eq(o).addClass("active")):($(".nav.navbar-nav").children().eq(o).removeClass("active"),$(".nav.nav-pills").children().eq(o).removeClass("active")),e.includes("post")&&($(".nav.navbar-nav").children().eq(1).addClass("active"),$(".nav.nav-pills").children().eq(1).addClass("active"))}),$(".nav").on("click",function(n){var e=$(n.target);e.parents("ul").children("li").each(function(n,e){var o=$(e);o.hasClass("active")&&o.removeClass("active")}),e.parents("li").addClass("active")})},scrollEvent:function(){let n=10,e=10;const o=window.location.href.split("#/")[1];e=$(window).width()<768?600:10,$(window).scroll(function(){window.innerHeight+window.scrollY>=document.body.offsetHeight-e&&"portfolio"===o&&(dbController.getAllInCategory("portfolio","portfolio",n),n+=10)})},unbindScrollEvent:function(){$(window).unbind("scroll")},commentEvent:function(){$("#comment-user").on("click",function(){event.preventDefault();const n=$(this).parents(".form-group").children(".textarea"),e=n.children(".inside").val(),o=n.children(".id").val();dbController.userComment(e,o)})},photoURL:function(){return $("#photoURL").val()}};export default events;