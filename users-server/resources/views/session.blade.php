<!DOCTYPE html>
<html>
<head>
    <title>Welcome</title>
</head>
<body>
<h1>
    @isset($welcomeMessage)
        {{ $welcomeMessage }}
    @else
        Default Welcome Message
    @endisset
</h1>
    <p>You have visited this page {{ $visitCount }} times.</p>
</body>
</html>
