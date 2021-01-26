BEGIN;

INSERT INTO accounts (id, accounts, user_id)
VALUES
    (1, 'Citizens Bank', 1),
    (2, 'Cash', 1),
    (3, 'Citizens Bank', 2),
    (4, 'Cash', 2),
    (5, 'Citizens Bank', 3),
    (6, 'Cash', 3);

SELECT setval('accounts_id_seq', (SELECT MAX(id) from accounts));

COMMIT;