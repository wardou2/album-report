class Api::V1::NotesController < ApplicationController
  def index
    @notes = Album.all
    render json: @notes
  end

  def update
    @note.update(note_params)
    if @note.save
      render json: @note, status: :accepted
    else
      render json: { errors: @note.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def note_params
    params.permit(:content)
  end

  def find_note
    @note = Note.find(params[:id])
  end
end
