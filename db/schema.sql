CREATE TABLE products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price_in_cents INTEGER NOT NULL CHECK (price_in_cents >= 0),
  image_url TEXT NOT NULL,
  color TEXT NOT NULL,
  badge TEXT,
  inventory_count INTEGER NOT NULL DEFAULT 0
    CHECK (inventory_count >= 0),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX products_category_idx ON products (category);
CREATE INDEX products_active_idx ON products (is_active)
WHERE is_active = TRUE;

INSERT INTO products (
  slug,
  name,
  category,
  price_in_cents,
  image_url,
  color,
  badge,
  inventory_count
)
VALUES
  (
    'ember-high-top',
    'Ember High Top',
    'Everyday sneaker',
    9800,
    '/shoe1.png',
    'Flame',
    'Bestseller',
    24
  ),
  (
    'cobalt-court',
    'Cobalt Court',
    'Low-top sneaker',
    9200,
    '/shoe2.png',
    'Cobalt',
    NULL,
    18
  ),
  (
    'after-hours',
    'After Hours',
    'High-top sneaker',
    11800,
    '/shoe3.png',
    'Black / Ember',
    'New',
    16
  ),
  (
    'maple-avenue',
    'Maple Avenue',
    'Heeled ankle boot',
    14800,
    '/shoe4.png',
    'Cognac',
    NULL,
    12
  ),
  (
    'terrain-runner',
    'Terrain Runner',
    'Performance sneaker',
    13200,
    '/shoe5.png',
    'Seafoam',
    NULL,
    20
  ),
  (
    'sunday-club',
    'Sunday Club',
    'Platform sneaker',
    10800,
    '/shoe6.png',
    'Chalk / Peach',
    NULL,
    22
  ),
  (
    'the-penny',
    'The Penny',
    'Classic loafer',
    12400,
    '/shoe7.png',
    'Oat',
    NULL,
    14
  ),
  (
    'midnight-trek',
    'Midnight Trek',
    'Chelsea boot',
    15600,
    '/shoe8.png',
    'Midnight',
    'Just in',
    10
  ),
  (
    'signal-pump',
    'Signal Pump',
    'Stiletto heel',
    13600,
    '/shoe9.png',
    'Signal red',
    NULL,
    15
  ),
  (
    'bramble-oxford',
    'Bramble Oxford',
    'Lug-sole oxford',
    14200,
    '/shoe10.png',
    'Brick',
    NULL,
    13
  ),
  (
    'mono-runner',
    'Mono Runner',
    'Leather sneaker',
    12800,
    '/shoe11.png',
    'Triple black',
    NULL,
    19
  ),
  (
    'nocturne',
    'Nocturne',
    'Platform heel',
    16400,
    '/shoe12.png',
    'Black / Blush',
    NULL,
    11
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  price_in_cents = EXCLUDED.price_in_cents,
  image_url = EXCLUDED.image_url,
  color = EXCLUDED.color,
  badge = EXCLUDED.badge,
  inventory_count = EXCLUDED.inventory_count,
  is_active = TRUE,
  updated_at = CURRENT_TIMESTAMP;
