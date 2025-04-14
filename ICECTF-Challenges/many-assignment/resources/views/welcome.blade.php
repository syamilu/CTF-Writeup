<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Many Assignment Challenge</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
        body {
            background: linear-gradient(135deg, #f0f4ff, #fdfbfb);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        .card {
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            max-width: 500px;
            margin: auto;
            background: white;
        }

        .fake-feature {
            color: #888;
            font-size: 0.9rem;
            margin-top: 1rem;
        }

        footer {
            margin-top: auto;
            background: #f8f9fa;
            padding: 1rem 0;
            text-align: center;
            font-size: 0.85rem;
            color: #6c757d;
        }

        .logo {
            font-size: 2rem;
            font-weight: 700;
            color: #0d6efd;
        }
    </style>
</head>
<body>

    <div class="container d-flex flex-column justify-content-center align-items-center" style="flex: 1;">
        <div class="card text-center">
            <div class="logo mb-2">ManyAssignment</div>
            <h4 class="mb-3">Welcome to Our Internal Portal</h4>
            <p class="mb-4">Please register or login to access your personalized dashboard.</p>

            <div class="d-grid gap-2">
                <a href="/register" class="btn btn-primary btn-lg">Register</a>
                <a href="/login" class="btn btn-outline-secondary btn-lg">Login</a>
            </div>

            <div class="fake-feature mt-4">
                🔒 Secure Portal | 👥 Trusted by over <s>420k</s> 4 users | 🚀 Admin dashboard launching soon...
            </div>
        </div>
    </div>

    <footer>
        © 2025 ManyAssignment Inc. | Powered by Laravel & 🧁
        <br>
        <a href="#" onclick="alert('Under construction')">Careers</a> | 
        <a href="#" onclick="alert('Nice try 😏')">Forgot Password</a> | 
        <a href="#" onclick="alert('Nothing here... yet 🤫')">Admin Login</a>
    </footer>

</body>
</html>
