# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 20_230_405_064_513) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'active_storage_attachments', force: :cascade do |t|
    t.string 'name', null: false
    t.string 'record_type', null: false
    t.bigint 'record_id', null: false
    t.bigint 'blob_id', null: false
    t.datetime 'created_at', null: false
    t.index ['blob_id'], name: 'index_active_storage_attachments_on_blob_id'
    t.index %w[record_type record_id name blob_id], name: 'index_active_storage_attachments_uniqueness', unique: true
  end

  create_table 'active_storage_blobs', force: :cascade do |t|
    t.string 'key', null: false
    t.string 'filename', null: false
    t.string 'content_type'
    t.text 'metadata'
    t.string 'service_name', null: false
    t.bigint 'byte_size', null: false
    t.string 'checksum'
    t.datetime 'created_at', null: false
    t.index ['key'], name: 'index_active_storage_blobs_on_key', unique: true
  end

  create_table 'active_storage_variant_records', force: :cascade do |t|
    t.bigint 'blob_id', null: false
    t.string 'variation_digest', null: false
    t.index %w[blob_id variation_digest], name: 'index_active_storage_variant_records_uniqueness', unique: true
  end

  create_table 'comments', force: :cascade do |t|
    t.bigint 'user_id', null: false
    t.bigint 'video_id', null: false
    t.text 'content'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['user_id'], name: 'index_comments_on_user_id'
    t.index ['video_id'], name: 'index_comments_on_video_id'
  end

  create_table 'likes', force: :cascade do |t|
    t.bigint 'user_id', null: false
    t.bigint 'video_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['user_id'], name: 'index_likes_on_user_id'
    t.index ['video_id'], name: 'index_likes_on_video_id'
  end

  create_table 'notifications', force: :cascade do |t|
    t.bigint 'user_id', null: false
    t.integer 'receiver_id'
    t.string 'notifiable_type', null: false
    t.bigint 'notifiable_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.string 'content'
    t.boolean 'read', default: false
    t.index %w[notifiable_type notifiable_id], name: 'index_notifications_on_notifiable'
    t.index ['user_id'], name: 'index_notifications_on_user_id'
  end

  create_table 'playlist_items', force: :cascade do |t|
    t.bigint 'playlist_id', null: false
    t.bigint 'video_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['playlist_id'], name: 'index_playlist_items_on_playlist_id'
    t.index ['video_id'], name: 'index_playlist_items_on_video_id'
  end

  create_table 'playlists', force: :cascade do |t|
    t.string 'title'
    t.text 'description'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.integer 'status'
  end

  create_table 'reports', force: :cascade do |t|
    t.string 'reportable_type', null: false
    t.bigint 'reportable_id', null: false
    t.string 'content'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index %w[reportable_type reportable_id], name: 'index_reports_on_reportable'
  end

  create_table 'streams', force: :cascade do |t|
    t.string 'title'
    t.text 'description'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.bigint 'user_id', null: false
    t.boolean 'streaming'
    t.index ['user_id'], name: 'index_streams_on_user_id'
  end

  create_table 'subscribes', force: :cascade do |t|
    t.bigint 'subscriber_id'
    t.bigint 'subscribed_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'user_playlists', force: :cascade do |t|
    t.integer 'action'
    t.bigint 'user_id', null: false
    t.bigint 'playlist_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['playlist_id'], name: 'index_user_playlists_on_playlist_id'
    t.index ['user_id'], name: 'index_user_playlists_on_user_id'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'email', default: '', null: false
    t.string 'encrypted_password', default: '', null: false
    t.string 'reset_password_token'
    t.datetime 'reset_password_sent_at'
    t.datetime 'remember_created_at'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.string 'jti', null: false
    t.string 'provider'
    t.string 'uid'
    t.string 'name', null: false
    t.integer 'role', null: false
    t.datetime 'deleted_at'
    t.index ['deleted_at'], name: 'index_users_on_deleted_at'
    t.index ['email'], name: 'index_users_on_email', unique: true
    t.index ['jti'], name: 'index_users_on_jti', unique: true
    t.index ['reset_password_token'], name: 'index_users_on_reset_password_token', unique: true
  end

  create_table 'videos', force: :cascade do |t|
    t.string 'title', null: false
    t.text 'description'
    t.bigint 'user_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.integer 'status', null: false
    t.integer 'likes_count'
    t.integer 'comments_count'
    t.datetime 'deleted_at'
    t.integer 'views_count'
    t.index ['deleted_at'], name: 'index_videos_on_deleted_at'
    t.index ['user_id'], name: 'index_videos_on_user_id'
  end

  create_table 'views', force: :cascade do |t|
    t.bigint 'video_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['video_id'], name: 'index_views_on_video_id'
  end

  add_foreign_key 'active_storage_attachments', 'active_storage_blobs', column: 'blob_id'
  add_foreign_key 'active_storage_variant_records', 'active_storage_blobs', column: 'blob_id'
  add_foreign_key 'comments', 'users'
  add_foreign_key 'comments', 'videos'
  add_foreign_key 'likes', 'users'
  add_foreign_key 'likes', 'videos'
  add_foreign_key 'notifications', 'users'
  add_foreign_key 'playlist_items', 'playlists'
  add_foreign_key 'playlist_items', 'videos'
  add_foreign_key 'streams', 'users'
  add_foreign_key 'user_playlists', 'playlists'
  add_foreign_key 'user_playlists', 'users'
  add_foreign_key 'videos', 'users'
  add_foreign_key 'views', 'videos'
end
