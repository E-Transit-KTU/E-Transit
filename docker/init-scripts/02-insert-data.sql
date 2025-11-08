INSERT INTO transporto_priemone (valstybiniai_num, rida, vietu_sk, kuro_tipas) VALUES
('ABC123', 50000, 5, 'Benzinas'),
('DEF456', 80000, 7, 'Dyzelinas'),
('GHI789', 30000, 4, 'Elektra'),
('JKL012', 120000, 5, 'LPG'),
('MNO345', 15000, 8, 'Benzinas')
ON CONFLICT (valstybiniai_num) DO NOTHING;