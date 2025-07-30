import { getAll as getCategoryAll, getById as getCategoryById } from "@/services/api/categoryService";
// Initialize ApperClient
const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'task';

export const getAll = async () => {
  try {
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "Tags" } },
        { field: { Name: "Owner" } },
        { field: { Name: "CreatedOn" } },
        { field: { Name: "CreatedBy" } },
        { field: { Name: "ModifiedOn" } },
        { field: { Name: "ModifiedBy" } },
        { field: { Name: "title" } },
        { field: { Name: "description" } },
        { field: { Name: "category" } },
        { field: { Name: "priority" } },
        { field: { Name: "dueDate" } },
        { field: { Name: "completed" } },
        { field: { Name: "archived" } },
        { field: { Name: "createdAt" } },
        { field: { Name: "completedAt" } }
      ],
      orderBy: [
        { fieldName: "CreatedOn", sorttype: "DESC" }
      ]
    };

    const response = await apperClient.fetchRecords(tableName, params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error fetching tasks:", error?.response?.data?.message);
      throw new Error(error?.response?.data?.message);
    } else {
      console.error("Error fetching tasks:", error.message);
      throw error;
    }
  }
};

export const getById = async (id) => {
  try {
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "Tags" } },
        { field: { Name: "Owner" } },
        { field: { Name: "CreatedOn" } },
        { field: { Name: "CreatedBy" } },
        { field: { Name: "ModifiedOn" } },
        { field: { Name: "ModifiedBy" } },
        { field: { Name: "title" } },
        { field: { Name: "description" } },
        { field: { Name: "category" } },
        { field: { Name: "priority" } },
        { field: { Name: "dueDate" } },
        { field: { Name: "completed" } },
        { field: { Name: "archived" } },
        { field: { Name: "createdAt" } },
        { field: { Name: "completedAt" } }
      ]
    };

    const response = await apperClient.getRecordById(tableName, id, params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data;
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message);
      throw new Error(error?.response?.data?.message);
    } else {
      console.error(`Error fetching task with ID ${id}:`, error.message);
      throw error;
    }
  }
};

export const create = async (taskData) => {
  try {
    // Only include Updateable fields based on Tables & Fields schema
    const params = {
      records: [{
        Name: taskData.title, // Using title as Name field
        Tags: "", // Default empty tags
        title: taskData.title,
        description: taskData.description || "",
        category: taskData.category || "personal",
        priority: taskData.priority || "medium",
        dueDate: taskData.dueDate || "",
        completed: false,
        archived: false,
        createdAt: new Date().toISOString(),
        completedAt: null
      }]
    };

    const response = await apperClient.createRecord(tableName, params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }

    if (response.results) {
      const successfulRecords = response.results.filter(result => result.success);
      const failedRecords = response.results.filter(result => !result.success);
      
      if (failedRecords.length > 0) {
        console.error(`Failed to create tasks ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
        
        failedRecords.forEach(record => {
          record.errors?.forEach(error => {
            throw new Error(`${error.fieldLabel}: ${error.message}`);
          });
          if (record.message) throw new Error(record.message);
        });
      }
      
      return successfulRecords[0]?.data;
    }
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error creating task:", error?.response?.data?.message);
      throw new Error(error?.response?.data?.message);
    } else {
      console.error("Error creating task:", error.message);
      throw error;
    }
  }
};

export const update = async (id, updateData) => {
  try {
    // Only include Updateable fields plus Id
    const params = {
      records: [{
        Id: parseInt(id),
        ...(updateData.title && { Name: updateData.title, title: updateData.title }),
        ...(updateData.description !== undefined && { description: updateData.description }),
        ...(updateData.category && { category: updateData.category }),
        ...(updateData.priority && { priority: updateData.priority }),
        ...(updateData.dueDate !== undefined && { dueDate: updateData.dueDate }),
        ...(updateData.completed !== undefined && { completed: updateData.completed }),
        ...(updateData.archived !== undefined && { archived: updateData.archived }),
        ...(updateData.createdAt && { createdAt: updateData.createdAt }),
        ...(updateData.completedAt !== undefined && { completedAt: updateData.completedAt })
      }]
    };

    const response = await apperClient.updateRecord(tableName, params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }

    if (response.results) {
      const successfulUpdates = response.results.filter(result => result.success);
      const failedUpdates = response.results.filter(result => !result.success);
      
      if (failedUpdates.length > 0) {
        console.error(`Failed to update tasks ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
        
        failedUpdates.forEach(record => {
          record.errors?.forEach(error => {
            throw new Error(`${error.fieldLabel}: ${error.message}`);
          });
          if (record.message) throw new Error(record.message);
        });
      }
      
      return successfulUpdates[0]?.data;
    }
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error updating task:", error?.response?.data?.message);
      throw new Error(error?.response?.data?.message);
    } else {
      console.error("Error updating task:", error.message);
      throw error;
    }
  }
};

export const delete_ = async (id) => {
  try {
    const params = {
      RecordIds: [parseInt(id)]
    };

    const response = await apperClient.deleteRecord(tableName, params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }

    if (response.results) {
      const successfulDeletions = response.results.filter(result => result.success);
      const failedDeletions = response.results.filter(result => !result.success);
      
      if (failedDeletions.length > 0) {
        console.error(`Failed to delete tasks ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
        
        failedDeletions.forEach(record => {
          if (record.message) throw new Error(record.message);
        });
      }
      
      return successfulDeletions.length > 0;
    }
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error deleting task:", error?.response?.data?.message);
      throw new Error(error?.response?.data?.message);
    } else {
      console.error("Error deleting task:", error.message);
      throw error;
    }
  }
};

// Export delete function with underscore name since 'delete' is reserved
export { delete_ as deleteTask };