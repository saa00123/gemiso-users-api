<!DOCTYPE html>
<html>
<head>
    <title>Welcome</title>
</head>
<body>
    <h1>{{ $welcomeMessage ?? 'Default Welcome Message' }}</h1>
    <p>You have visited this page {{ $visitCount }} times.</p>
</body>
</html>
