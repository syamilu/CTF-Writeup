<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>User Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container mt-5">
    <div class="card shadow-lg mx-auto" style="max-width: 500px;">
        <div class="card-body text-center">
            <h3>Welcome, {{ $user->name }}</h3>
            <p class="mt-3">You are <strong>{{ $user->is_admin ? 'an Admin 👑' : 'a Normal User 👤' }}</strong></p>
            @if (!$user->is_admin)
                <p class="text-muted">Only Admins can view the flag.</p>
            @endif
        </div>
    </div>
</div>
</body>
</html>
