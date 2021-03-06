const router = require("express").Router();
const { User, Post, Comment } = require("../models/");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "content", "created_at"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "user_comment",
            "user_id",
            "post_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("all-posts-admin", {
      layout: "dashboard",
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.redirect("login");
  }
});
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: ["id", "title", "content", "created_at"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "user_comment",
            "user_id",
            "post_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    if (postData) {
      const post = postData.get({ plain: true });
      res.render("edit-post", {
        layout: "dashboard",
        post,
        logged_in: req.session.logged_in,
      });
    } else {
      res.status(500).json(err);
    }
  } catch (err) {
    res.redirect("login");
  }
});
router.get("/new", (req, res) => {
  res.render("add-post", {
    layout: "dashboard",
  });
});

module.exports = router;
