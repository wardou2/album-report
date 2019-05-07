class NoteSerializer < ActiveModel::Serializer
  attributes :id, :content, :album
end
