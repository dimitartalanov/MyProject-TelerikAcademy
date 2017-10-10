const validator=function(){function t(t){if(!n.USER_NAME_PATTERN.test(t))throw A.INVALID_USERNAME_MESSAGE}function e(t){if(!n.EMAIL_PATTERN.test(t))throw A.INVALID_EMAIL_MESSAGES}function a(t){if(!n.PASSWORD_PATTERN.test(t))throw A.INVALID_PASSWORD_MESSAGE}const n={NAME_PATTERN:/[^a-zA-Z]/,PASSWORD_PATTERN:/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}/,USER_NAME_PATTERN:/\S[_a-zA-Z0-9]{5,10}/,EMAIL_PATTERN:/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,RESTRICTED_SYMBOLS_PATTERN:/[<>$@#&]/gm},A={INVALID_PASSWORD_MESSAGE:"The password must be at least 6 symbols long and contain at least one uppercase, lowercase and a number.",INVALID_USERNAME_MESSAGE:"The username must be between 6 and 10 symbols and include only letters, numbers and underscores.",INVALID_EMAIL_MESSAGES:"The email is badly formatted."};return{validateSignUpForm:function(n,A,E){t(E),e(n),a(A)},validateUsername:t,validateEmail:e,validatePassword:a,formatUserInput:function(t){let e=/[/&<>"'/]/g,a={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};return t=function(t){return String(t).replace(e,function(t){return a[t]})}(t=t.trim())}}}();export default validator;