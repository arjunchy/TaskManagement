const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const userId = req.user.id;
    const projectCount = await Project.countDocuments({ user: userId });

    if (projectCount >= 4) return res.status(400).json({ error: 'Maximum of 4 projects allowed per user' });

    const project = new Project({ name: req.body.name, user: userId });
    await project.save();

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};
