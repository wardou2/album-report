class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :title, :artist, :notes, :art
end
