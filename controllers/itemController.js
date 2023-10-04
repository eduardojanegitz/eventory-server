import Item from "../models/Item.js";

  export const createItem = async (req, res) => {
    try {
      const item = {
        name: req.body.name,
        description: req.body.description,
        value: req.body.value,
        location: req.body.location,
        itemGroup: req.body.itemGroup,
        supplier: req.body.supplier,
        serialNumber: req.body.serialNumber,
        tag: req.body.tag,
      };

      const response = await Item.create(item);
      res.status(201).json({ response, msg: "Item criado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  };

  export const getAllItems = async (req, res) => {
    try {
      const getItem = await Item.find();

      res.status(200).json(getItem);
    } catch (error) {
      console.log(error);
    }
  };

  export const getOne = async (req, res) => {
    try {
      const tag = req.params.tag;
      const getItemByTag = await Item.findOne({ tag });

      res.status(200).json(getItemByTag);
    } catch (error) {
      console.log("Erro em encontrar o item", error);
    }
  };

  export const deleteItem = async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findById(id).exec();
      if (!item) {
        res.status(204).json({ msg: `Nenhum item encontrado!` });
      }
      const response = await item.deleteOne();
      res
        .status(200)
        .json({ response, msg: "Item excluído com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  };
  

  
  export const totalValue = async (req, res) => {
    // const value = {"value"}
    try {
      const countVal = await Item.aggregate([
        {
          $group: {
            _id: {id: "_id"},
            total: { $sum: "$value"}
          }
        }
      ]);


      res.status(200).json(countVal);
    } catch (error) {
      console.log(error);
    }
  };

  export const getItemsFromLastMonth = async (req, res) => {
    try {
      const today = new Date();
  
      const firstDayActualMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      firstDayActualMonth.setHours(0, 0, 0, 0);
  
      const firstDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      firstDayLastMonth.setMonth(firstDayLastMonth.getMonth() - 1);
      firstDayLastMonth.setHours(0, 0, 0, 0);
  
      const itemsLastMonth = await Item.find({
        createdAt: {
          $gte: firstDayLastMonth,
          $lt: firstDayActualMonth,
        },
      });
  
      res.status(200).json(itemsLastMonth);
    } catch (error) {
      console.log("Erro em encontrar os itens do mês anterior", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  };
  

