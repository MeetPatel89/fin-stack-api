BEGIN;

INSERT INTO users (id, fullname, username, password)
VALUES 
    (1, 'Nautilus Shell', 'nautilus89', 'NautilusShell89'),
    (2, 'Fibonacci Spiral', 'fibonacci89', 'FibonacciSpiral89'),
    (3, 'Golden Ratio', 'golden89', 'GoldenSpiral89');

SELECT setval('users_id_seq', (SELECT MAX(id) from users));

COMMIT;