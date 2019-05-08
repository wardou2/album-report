class NoteSerializer < ActiveModel::Serializer
  attributes :id, :content, :album, :created_at, :album_id
end
