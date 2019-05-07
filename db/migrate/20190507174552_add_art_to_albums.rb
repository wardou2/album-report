class AddArtToAlbums < ActiveRecord::Migration[5.2]
  def change
    add_column :albums, :art, :string
  end
end
