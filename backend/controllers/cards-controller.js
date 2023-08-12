const Column =require("../models/column-model");

exports.getCards = async(req,res)=>{
    try{
        // const allCards = await Card.find();
        const allColumns = await Column.find();
        return res.json({Columns:allColumns});

    }catch(err){
        console.log(err);
        return res.json({status: "error", msg: err.message});
    }
};


exports.addCard = async(req,res)=>{
    const addedCard = req.body;
    try{
        const foundColumn = await Column.findOne({name: addedCard.column});
        if (!foundColumn){
            return res.json({status:"error",msg :"column not found"});
        }
        if(foundColumn.tasks.find((task)=>task.title === addedCard.title)){
            return res.json({status:"error",msg :"card already added"});
        }
        
    const newTask={
        title: addedCard.title,
        desc : addedCard.desc,
        date: addedCard.date,
        subtask:[]
    }
    foundColumn.tasks.push(newTask);
    await foundColumn.save();
    console.log("card created");
    const allCloumns = await Column.find();

    return res.json({status:"success",Columns:allCloumns});
    }catch(err){
        console.log(err);
        return res.json({status: "error", msg: err.message});    }
}



exports.addColumn = async(req,res)=>{
    const addedColumn = req.body;
    try{
        const foundColumn = await Column.findOne({name: addedColumn.name});
        if (foundColumn){
            return res.json({status:"error",msg :"column already added"});
        }
        
    await Column.create(addedColumn);
    console.log("Column created");
    const allCloumns = await Column.find();
    return res.json({status:"success",Columns:allCloumns});
    }catch(err){
        console.log(err);
        return res.json({status: "error", msg: err.message});    }
}


exports.deleteCard = async(req,res)=>{
    const deletedCardId = req.params.id;
    try{
        const foundColumn = await Column.findOne({"tasks._id": deletedCardId});
        if (!foundColumn){
            return res.json({status:"error",msg :"card not found"});
        }

    const deletedCard =foundColumn.tasks.find((task)=>(task._id.toString() === deletedCardId))
    if (!deletedCard){
        return res.json({status:"error",msg :"card not found"});
    }

    const deletedCardIndex =foundColumn.tasks.indexOf(deletedCard);
    foundColumn.tasks.splice(deletedCardIndex,1);
    await foundColumn.save();

        console.log("card deleted");
    const allCloumns = await Column.find();
    return res.json({status:"success",Columns:allCloumns});
    }catch(err){
        console.log(err);
        return res.json({status: "error", msg: err.message});
    }

}


exports.updateCard = async(req,res)=>{
    const updatedCardId = req.params.id;
    const updatedValues = req.body;
    try{
        const foundColumn = await Column.findOne({"tasks._id": updatedCardId});

        if (!foundColumn){
            console.log("1")
            return res.json({status:"error",msg :"card not found"});
        }


    const editedCard =foundColumn.tasks.find((task)=>(task._id.toString() === updatedCardId))
    if (!editedCard){
        console.log("2")
        return res.json({status:"error",msg :"card not found"});
    }

    const editedCardIndex =foundColumn.tasks.indexOf(editedCard);

    foundColumn.tasks[editedCardIndex].title = updatedValues.title;
    foundColumn.tasks[editedCardIndex].desc = updatedValues.desc;
    foundColumn.tasks[editedCardIndex].date = updatedValues.date;
    foundColumn.tasks[editedCardIndex].subtask = updatedValues.subtask;
    if (foundColumn.name !==updatedValues.column){
        foundColumn.tasks.splice(editedCardIndex,1);
        await foundColumn.save();
        const newColumn = await Column.findOne({name: updatedValues.column});
        if (!newColumn){
            return res.json({status:"error",msg :"column not found"});
        }

        const newTask={
            title: editedCard.title,
            desc : editedCard.desc,
            date: editedCard.date,
            subtask:editedCard.subtask
        }
        newColumn.tasks.push(newTask);
        console.log(newColumn)
        await newColumn.save();
        const allCloumns = await Column.find();
        return res.json({status:"success",Columns:allCloumns});

    }

    await foundColumn.save();
    console.log("card updated");
    const allCloumns = await Column.find();
    return res.json({status:"success",Columns:allCloumns});

    }catch(err){
        console.log(err);
        return res.json({status: "error", msg: err.message});
    }

}