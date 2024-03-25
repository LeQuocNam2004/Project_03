import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/system";

// [GET] /admin/songs/
export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false
  });

  console.log(songs);

  res.render("admin/pages/songs/index", {
    pageTitle: "Quản lý bài hát",
    songs: songs
  });
};

// [GET] /admin/songs/create
export const create = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
    status: "active"
  }).select("title");

  const singers = await Singer.find({
    deleted: false,
    status: "active"
  }).select("fullName");

  res.render("admin/pages/songs/create", {
    pageTitle: "Thêm mới bài hát",
    topics: topics,
    singers: singers
  });
};

// [POST] /admin/songs/create
export const createPost = async (req: Request, res: Response) => {
  if(req.body.avatar) {
    req.body.avatar = req.body.avatar[0];
  }

  if(req.body.audio) {
    req.body.audio = req.body.audio[0];
  }
  
  const song = new Song(req.body);
  await song.save();

  res.redirect(`/${systemConfig.prefixAdmin}/songs`);
}