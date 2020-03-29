<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\TaskCreated;
use App\Events\TaskRemoved;
use App\Task;

class TaskController extends Controller
{
    //
    public function fetchAll()
    {

        $tasks = Task::all();

        return $tasks;
    }

    public function store(Request $request)
    {

        $task = Task::create($request->all());


        broadcast(new TaskCreated($task));

        return response()->json("added");
    }


    public function update(Request $request, $id)
    {
        $task = Task::find($id);
        Task::where('id', '=', $task->id)->update(['completed' => 1]);
        return response()->json("updated");
    }

    public function todoTitleUpdate(Request $request, $id)
    {
        $task = Task::find($id);
        Task::where('id', '=', $task->id)->update(['title' => $request->title]);
        return response()->json("updated");
    }

    public function delete($id)
    {
        $task = Task::find($id);

        broadcast(new TaskRemoved($task));

        Task::destroy($id);


        return response()->json("deleted");
    }

    public function activeTodos()
    {
        $tasks = Task::where('completed', '=', 0)->get();

        return $tasks;
    }

    public function completedTodos()
    {
        $tasks = Task::where('completed', '=', 1)->get();

        return $tasks;
    }

    public function deleteAllCompletedTask()
    {
        Task::where('completed', '=', 1)->delete();
        return response()->json("deleted");
    }
}
