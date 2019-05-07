require 'pry'
class Api::V1::AlbumsController < ApplicationController

  def index
    @albums = Album.all
    render json: @albums
  end

  def create
    binding.pry
    @album = Album.new(title: album_params['albumTitle'], artist: @artist, art: album_params['coverArt'])
    binding.pry
    if @album.save
      render json: @album, status: :accepted
    else
      render json: { errors: @album.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def update
    @album.update(album_params)
    if @album.save
      render json: @album, status: :accepted
    else
      render json: { errors: @album.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def album_params
    @artist = Artist.find_or_create_by(name: params['artistName'])
    params.permit(:albumTitle, :artistName, :coverArt)
  end

  def find_album
    @album = Album.find(params[:id])
  end
end
