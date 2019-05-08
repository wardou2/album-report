class Api::V1::NotesController < ApplicationController
  before_action :find_note, only: [:destroy, :update]
  skip_before_action :verify_authenticity_token

  def index
    @notes = Album.all
    render json: @notes
  end

  def create
    @note = Note.new(note_params)
    if @note.save
      render json: @note, status: :accepted
    else
      render json: { errors: @note.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def update
    @note.update(note_params)
    if @note.save
      render json: @note, status: :accepted
    else
      render json: { errors: @note.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def destroy
    @note.destroy()
    render json: @note
  end

  private

  def note_params
    params.require(:note).permit(:content, :album_id)
  end

  def find_note
    @note = Note.find(params[:id])
  end
end
