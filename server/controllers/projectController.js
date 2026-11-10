import Project from '../models/Project.js';
import { isDBConnected } from '../config/db.js';
import { memoryStore } from '../utils/memoryStore.js';

// @desc    Get all projects with division/category filtering
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    const { division, category, featured, page = 1, limit = 12 } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    if (isDBConnected()) {
      const query = {};
      if (division && division !== 'All') query.division = division;
      if (category && category !== 'All') query.category = category;
      if (featured === 'true') query.isFeatured = true;

      const total = await Project.countDocuments(query);
      const projects = await Project.find(query)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);

      return res.status(200).json({
        success: true,
        count: projects.length,
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1,
        data: projects,
      });
    } else {
      let results = [...memoryStore.projects];

      if (division && division !== 'All') {
        results = results.filter((p) => p.division === division);
      }
      if (category && category !== 'All') {
        results = results.filter((p) => p.category === category);
      }
      if (featured === 'true') {
        results = results.filter((p) => p.isFeatured === true);
      }

      results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const total = results.length;
      const paginated = results.slice((pageNum - 1) * limitNum, pageNum * limitNum);

      return res.status(200).json({
        success: true,
        count: paginated.length,
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1,
        data: paginated,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve projects.',
      error: error.message,
    });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private (Admin)
export const createProject = async (req, res) => {
  try {
    const body = req.body;
    let newProject;

    if (isDBConnected()) {
      newProject = await Project.create(body);
    } else {
      newProject = {
        _id: `proj-${Date.now()}`,
        ...body,
        createdAt: new Date(),
      };
      memoryStore.projects.unshift(newProject);
    }

    return res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data: newProject,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Failed to create project.',
      error: error.message,
    });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    if (isDBConnected()) {
      const updated = await Project.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Project not found.' });
      }
      return res.status(200).json({ success: true, data: updated });
    } else {
      const idx = memoryStore.projects.findIndex((p) => String(p._id) === String(id));
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Project not found.' });
      }
      memoryStore.projects[idx] = { ...memoryStore.projects[idx], ...body, updatedAt: new Date() };
      return res.status(200).json({ success: true, data: memoryStore.projects[idx] });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Failed to update project.',
      error: error.message,
    });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDBConnected()) {
      const deleted = await Project.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Project not found.' });
      }
    } else {
      const idx = memoryStore.projects.findIndex((p) => String(p._id) === String(id));
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Project not found.' });
      }
      memoryStore.projects.splice(idx, 1);
    }

    return res.status(200).json({
      success: true,
      message: 'Project record deleted successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete project.',
      error: error.message,
    });
  }
};

