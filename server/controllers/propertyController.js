import Property from '../models/Property.js';
import { isDBConnected } from '../config/db.js';
import { memoryStore } from '../utils/memoryStore.js';

// @desc    Get all properties with filtering, sorting and pagination
// @route   GET /api/properties
// @access  Public
export const getProperties = async (req, res) => {
  try {
    const {
      location,
      propertyType,
      purpose,
      minPrice,
      maxPrice,
      sort = 'newest',
      page = 1,
      limit = 9,
    } = req.query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    if (isDBConnected()) {
      const query = {};

      if (location && location !== 'All') {
        query.$or = [
          { location: { $regex: location, $options: 'i' } },
          { city: { $regex: location, $options: 'i' } },
        ];
      }

      if (propertyType && propertyType !== 'All') {
        query.propertyType = propertyType;
      }

      if (purpose && purpose !== 'All') {
        query.purpose = purpose;
      }

      if (minPrice || maxPrice) {
        query.priceNumeric = {};
        if (minPrice) query.priceNumeric.$gte = Number(minPrice);
        if (maxPrice) query.priceNumeric.$lte = Number(maxPrice);
      }

      let sortOptions = { createdAt: -1 };
      if (sort === 'price_asc') sortOptions = { priceNumeric: 1 };
      if (sort === 'price_desc') sortOptions = { priceNumeric: -1 };
      if (sort === 'area_desc') sortOptions = { areaNumeric: -1 };

      const total = await Property.countDocuments(query);
      const properties = await Property.find(query)
        .sort(sortOptions)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);

      return res.status(200).json({
        success: true,
        count: properties.length,
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1,
        data: properties,
      });
    } else {
      let results = [...memoryStore.properties];

      if (location && location !== 'All') {
        const loc = location.toLowerCase();
        results = results.filter(
          (p) =>
            p.location.toLowerCase().includes(loc) ||
            (p.city && p.city.toLowerCase().includes(loc))
        );
      }

      if (propertyType && propertyType !== 'All') {
        results = results.filter((p) => p.propertyType === propertyType);
      }

      if (purpose && purpose !== 'All') {
        results = results.filter((p) => p.purpose === purpose);
      }

      if (minPrice) {
        results = results.filter((p) => p.priceNumeric >= Number(minPrice));
      }
      if (maxPrice) {
        results = results.filter((p) => p.priceNumeric <= Number(maxPrice));
      }

      if (sort === 'price_asc') {
        results.sort((a, b) => a.priceNumeric - b.priceNumeric);
      } else if (sort === 'price_desc') {
        results.sort((a, b) => b.priceNumeric - a.priceNumeric);
      } else if (sort === 'area_desc') {
        results.sort((a, b) => (b.areaNumeric || 0) - (a.areaNumeric || 0));
      } else {
        results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

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
      message: 'Failed to retrieve properties.',
      error: error.message,
    });
  }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDBConnected()) {
      const property = await Property.findById(id);
      if (!property) {
        return res.status(404).json({ success: false, message: 'Property not found' });
      }
      return res.status(200).json({ success: true, data: property });
    } else {
      const property = memoryStore.properties.find((p) => String(p._id) === String(id));
      if (!property) {
        return res.status(404).json({ success: false, message: 'Property not found' });
      }
      return res.status(200).json({ success: true, data: property });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching property details',
      error: error.message,
    });
  }
};

// @desc    Create a new property
// @route   POST /api/properties
// @access  Private (Admin)
export const createProperty = async (req, res) => {
  try {
    const body = req.body;
    let newProperty;

    if (isDBConnected()) {
      newProperty = await Property.create(body);
    } else {
      newProperty = {
        _id: `prop-${Date.now()}`,
        ...body,
        createdAt: new Date(),
      };
      memoryStore.properties.unshift(newProperty);
    }

    return res.status(201).json({
      success: true,
      message: 'Property listing created successfully.',
      data: newProperty,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Failed to create property.',
      error: error.message,
    });
  }
};

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private (Admin)
export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    if (isDBConnected()) {
      const updated = await Property.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Property not found' });
      }
      return res.status(200).json({ success: true, data: updated });
    } else {
      const idx = memoryStore.properties.findIndex((p) => String(p._id) === String(id));
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Property not found' });
      }
      memoryStore.properties[idx] = { ...memoryStore.properties[idx], ...body, updatedAt: new Date() };
      return res.status(200).json({ success: true, data: memoryStore.properties[idx] });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Failed to update property.',
      error: error.message,
    });
  }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private (Admin)
export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDBConnected()) {
      const deleted = await Property.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Property not found' });
      }
    } else {
      const idx = memoryStore.properties.findIndex((p) => String(p._id) === String(id));
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Property not found' });
      }
      memoryStore.properties.splice(idx, 1);
    }

    return res.status(200).json({
      success: true,
      message: 'Property listing deleted successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete property.',
      error: error.message,
    });
  }
};

