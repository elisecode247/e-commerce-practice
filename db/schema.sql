CREATE TABLE IF NOT EXISTS products (
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

CREATE INDEX IF NOT EXISTS products_category_idx ON products (category);
CREATE INDEX IF NOT EXISTS products_active_idx ON products (is_active)
WHERE is_active = TRUE;

CREATE TABLE IF NOT EXISTS reviews (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  reviewer_name TEXT NOT NULL,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  is_verified_purchase BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT reviews_product_reviewer_title_key
    UNIQUE (product_id, reviewer_name, title)
);

CREATE INDEX IF NOT EXISTS reviews_product_created_at_idx
ON reviews (product_id, created_at DESC);

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

INSERT INTO reviews (
  product_id,
  reviewer_name,
  rating,
  title,
  body,
  is_verified_purchase,
  created_at
)
SELECT
  product.id,
  review.reviewer_name,
  review.rating,
  review.title,
  format(review.body_template, product.name, product.color),
  review.is_verified_purchase,
  review.created_at
FROM products AS product
CROSS JOIN (
  VALUES
    (
      'Maya R.',
      5::SMALLINT,
      'My new everyday pair',
      'The %s has become my first choice for long days and easy weekends. The cushioning stays comfortable after hours of walking, and the %s color works with nearly everything I own.',
      TRUE,
      '2026-08-28 12:00:00-07'::TIMESTAMPTZ
    ),
    (
      'Jordan K.',
      5::SMALLINT,
      'Comfort from the first step',
      'The %s felt comfortable from the first wear and fit true to size for me. I ordered my usual size and had enough room in the toe without any heel slipping.',
      TRUE,
      '2026-08-14 09:30:00-07'::TIMESTAMPTZ
    ),
    (
      'Alex T.',
      4::SMALLINT,
      'Even better in person',
      'The shape of the %s looks even better in person, and the %s finish has more depth than it does in the photos. I took off one star because the first wear felt a little stiff.',
      FALSE,
      '2026-07-30 16:45:00-07'::TIMESTAMPTZ
    ),
    (
      'Priya S.',
      5::SMALLINT,
      'Worth the wait',
      'I kept coming back to the %s and finally ordered it. The construction feels solid, the details are clean, and the %s color is exactly what I hoped for.',
      TRUE,
      '2026-07-18 11:20:00-07'::TIMESTAMPTZ
    ),
    (
      'Chris D.',
      4::SMALLINT,
      'Great once broken in',
      'The %s needed two short wears to soften up, but it has been comfortable ever since. The sole feels supportive and the shoe still looks sharp after several weeks.',
      TRUE,
      '2026-07-02 18:10:00-07'::TIMESTAMPTZ
    ),
    (
      'Nina L.',
      5::SMALLINT,
      'A very versatile shoe',
      'I have worn the %s with jeans, trousers, and a casual dress, and it works with all three. The %s shade is distinctive without being difficult to style.',
      TRUE,
      '2026-06-21 08:40:00-07'::TIMESTAMPTZ
    ),
    (
      'Marcus B.',
      3::SMALLINT,
      'Runs a little narrow',
      'The quality of the %s is good, but the forefoot felt narrower than expected. Going up half a size helped, though I would prefer a wide option.',
      TRUE,
      '2026-06-05 14:25:00-07'::TIMESTAMPTZ
    ),
    (
      'Elena V.',
      5::SMALLINT,
      'Held up on a full day out',
      'I wore the %s for a full day around the city and did not get any hot spots or blisters. It felt stable on uneven sidewalks and was easy to clean afterward.',
      TRUE,
      '2026-05-19 19:05:00-07'::TIMESTAMPTZ
    ),
    (
      'Sam W.',
      4::SMALLINT,
      'Looks polished and feels sturdy',
      'The %s feels substantial without being overly heavy. Stitching and finishing are neat, and the %s color has stayed consistent despite regular wear.',
      FALSE,
      '2026-05-01 10:15:00-07'::TIMESTAMPTZ
    ),
    (
      'Taylor G.',
      5::SMALLINT,
      'Already bought a second pair',
      'The %s quickly became the pair I reach for most often. The fit is secure, the footbed has a nice amount of give, and it still feels supportive late in the day.',
      TRUE,
      '2026-04-16 13:50:00-07'::TIMESTAMPTZ
    ),
    (
      'Devon H.',
      4::SMALLINT,
      'Accurate photos and sizing',
      'What arrived matched the photos closely. My usual size in the %s fit well with medium-weight socks, the %s color was accurate, and the materials feel durable.',
      TRUE,
      '2026-03-29 17:35:00-07'::TIMESTAMPTZ
    ),
    (
      'Riley P.',
      2::SMALLINT,
      'Not quite right for my feet',
      'I liked the look of the %s, but the arch support landed in the wrong place for me. The materials seem well made, so this may simply be a fit issue.',
      TRUE,
      '2026-03-10 09:05:00-07'::TIMESTAMPTZ
    ),
    (
      'Morgan C.',
      5::SMALLINT,
      'Excellent finish',
      'The small details on the %s are especially nice in person. The edges are clean, the panels line up well, and the %s finish gives the shoe a premium look.',
      TRUE,
      '2026-02-22 15:45:00-08'::TIMESTAMPTZ
    ),
    (
      'Jamie F.',
      4::SMALLINT,
      'Reliable for weekly wear',
      'After two months of wearing the %s several times a week, the sole has very little visible wear and the upper has kept its shape. I would like slightly more cushioning at the heel.',
      TRUE,
      '2026-02-04 12:30:00-08'::TIMESTAMPTZ
    ),
    (
      'Casey N.',
      5::SMALLINT,
      'Gift was a hit',
      'I bought the %s as a gift after checking the size guide. The fit was right, the %s color was a hit, and the packaging made it feel special right out of the box.',
      FALSE,
      '2026-01-17 16:20:00-08'::TIMESTAMPTZ
    ),
    (
      'Avery J.',
      3::SMALLINT,
      'Good shoe, firmer than expected',
      'The %s looks great and feels secure, but the footbed is firmer than I expected. It works well for shorter outings, though I add an insole for longer days.',
      TRUE,
      '2025-12-28 11:55:00-08'::TIMESTAMPTZ
    )
) AS review (
  reviewer_name,
  rating,
  title,
  body_template,
  is_verified_purchase,
  created_at
)
WHERE product.slug IN (
  'ember-high-top',
  'cobalt-court',
  'after-hours',
  'maple-avenue',
  'terrain-runner',
  'sunday-club',
  'the-penny',
  'midnight-trek',
  'signal-pump',
  'bramble-oxford',
  'mono-runner',
  'nocturne'
)
ON CONFLICT (product_id, reviewer_name, title) DO UPDATE SET
  rating = EXCLUDED.rating,
  body = EXCLUDED.body,
  is_verified_purchase = EXCLUDED.is_verified_purchase,
  created_at = EXCLUDED.created_at,
  updated_at = CURRENT_TIMESTAMP;
