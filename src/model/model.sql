CREATE TABLE admin(
    admin_id bigserial PRIMARY KEY,
    admin_name text not null,
    admin_password text not null
);

CREATE TABLE users (
    user_id bigserial PRIMARY KEY,
    user_name text not null,
    user_surname text not null,
    user_age int DEFAULT 0,
    user_who text DEFAULT 'erkak',
    user_phone text not null,
    user_password text not null,
    user_country text not null,
    user_capital text not null,
    user_balance int DEFAULT 0,
    user_device_id text [] not null,
    user_survays int [],
    user_comment text DEFAULT 'Comment:',
    user_create_date timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE apps(
    app_id bigserial,
    app_name text not null,
    app_current_version int not null,
    app_min_version int not null,
    app_key text not null PRIMARY KEY,
    app_price int not null,
    app_payment text,
    app_post BOOLEAN DEFAULT false,
    app_create_date timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE apps_user (
    app_user_id bigserial PRIMARY KEY,
    app_user_install_date timestamptz DEFAULT CURRENT_TIMESTAMP,
    app_user_isPayed BOOLEAN DEFAULT false,
    app_user_isterested_to_buy int DEFAULT 0,
    app_user_notification_token text,
    user_id int not null REFERENCES users(user_id) ON DELETE CASCADE,
    app_key text not null REFERENCES apps(app_key) ON DELETE CASCADE,
    click_id text
);

CREATE TABLE sms_users (
    sms_users_id bigserial PRIMARY KEY,
    sms_users__code text not null,
    user_phone text not null,
    sms_isActive BOOLEAN DEFAULT true,
    sms_create_date timestamptz DEFAULT CURRENT_TIMESTAMP
);  

CREATE TABLE sms_token (
    sms_token_id bigserial PRIMARY KEY,
    sms_token text not null,
    sms_create_date timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE news (
    new_id bigserial PRIMARY KEY,
    new_title text not null,
    new_description text not null,
    new_img text not null,
    new_img_name text not null,
    app_key text DEFAULT "all",
    likes_count int DEFAULT 0,
    dislike_count int DEFAULT 0,
    views_count int DEFAULT 0,
    new_create_date timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tracking_users (
    tracking_user_id bigserial PRIMARY KEY,
    user_id int not null REFERENCES users(user_id) ON DELETE CASCADE,
    app_key text not null REFERENCES apps(app_key) ON DELETE CASCADE,
    new_tracking_user_create_date timestamptz DEFAULT CURRENT_TIMESTAMP
);